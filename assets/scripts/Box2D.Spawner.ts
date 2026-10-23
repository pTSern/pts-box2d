
import { _decorator, JsonAsset, Node } from 'cc';
import { Box2D_ESpawnOpt } from './Box2D.Enums';
import { Box2D_Option } from './Box2D.Option';
import { editor_property, instance } from 'db://pts-core/scripts/utils/pClass';
import { Box2D_Runtime } from './Box2D.Runtime';
import { pConst, pEngine } from 'db://pts-core/scripts/utils';
import { Smart_StartUp } from 'db://pts-core/scripts/Components/Smart/Smart.StartUp';
import { Event_Flexer } from 'db://pts-core/scripts/Components/Event/Event.Flexer';
import { Box2D_Manager } from './Box2D.Manager';

const { ccclass, property } = _decorator;

@ccclass('Box2D_Spawner')
export class Box2D_Spawner extends Smart_StartUp {

    @property({ type: Box2D_ESpawnOpt, group: pConst.GROUPS.CORE })
    spawnOption: Box2D_ESpawnOpt = Box2D_ESpawnOpt.Parallel;

    @property({ type: Node, group: pConst.GROUPS.CORE })
    pool: Node = null;

    @property({ type: [Box2D_Option], group: pConst.GROUPS.CORE })
    options: Box2D_Option[] = [];

    @editor_property([Box2D_Runtime])
    protected _runtimes: Box2D_Runtime[] = [];
    @editor_property()
    protected _seqIdx: number = 0;
    @editor_property()
    protected _isOk: boolean = false;

    @property({ type: Event_Flexer, group: pConst.GROUPS.EVENT })
    onComplete: Event_Flexer = new Event_Flexer();

    @property({ type: JsonAsset, group: pConst.GROUPS.LISTENER })
    actWarmUp: JsonAsset[] = [];

    @property({ type: JsonAsset, group: pConst.GROUPS.LISTENER })
    actSpawn: JsonAsset[] = [];

    protected _onLoad(): void {
        this._runtimes = this.options.map(option => {
            return new Box2D_Runtime(option, this.pool);
        });
        pEngine.Json.event.add(this.actWarmUp, { func: this._onWarmUp, binder: this });
    }

    protected async _onExecute() {
        this._isOk = true;
        if (this.spawnOption === Box2D_ESpawnOpt.Parallel) {
            const _map = this._runtimes.map(runtime => new Promise<void>( _rs => runtime.start(_rs)));
            Promise.all(_map).then( _ => this.onComplete.emit());
        } else if (this.spawnOption === Box2D_ESpawnOpt.Sequence) {
            this.startSequential(0);
        }
    }

    protected _onWarmUp() {
        const _list = [
            instance(Box2D_Manager).ready(),
            ...this.options.map(option => option.ready())
        ]
        return Promise.all(_list);
    }

    protected _onPause(): void {
    }

    protected _onResume(): void {
    }

    protected _onDestroy(): void {
        pEngine.Json.event.remove(this.actWarmUp, { func: this._onWarmUp, binder: this });
        this._runtimes.forEach(runtime => runtime.clear());
    }

    protected _onStop(): void {
        this._runtimes.forEach(runtime => runtime.stop());
    }

    protected startSequential(index: number): void {
        if (index >= this._runtimes.length) {
            this.onComplete.emit();
            return;
        }

        this._seqIdx = index;
        const _runtime = this._runtimes[index];
        _runtime.start(() => {
            if (this.spawnOption === Box2D_ESpawnOpt.Sequence) {
                this.startSequential(index + 1);
            }
        });
    }

    protected onDisable(): void {
        this.stop();
    }
}
