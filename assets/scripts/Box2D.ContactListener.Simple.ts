import { _decorator, Node } from "cc";
import { Box2D_ContactListener } from "./Box2D.ContactListener";
import { pDriver } from "db://pts-core/scripts/utils";

const { ccclass } = _decorator;

interface _I {
    onEnter: (target: Node, other: Node) => void;
    onStay: (target: Node, other: Node) => void;
    onExit: (target: Node, other: Node) => void;
}

@ccclass("Box2D_ContactListener_Simple")
export class Box2D_ContactListener_Simple extends Box2D_ContactListener {
    protected _driver = pDriver.Handler.create<_I>();

    protected _onEnter(target: Node, other: Node): void {
        this._driver.emit("onEnter", target, other);
    }

    protected _onStay(target: Node, other: Node): void {
        this._driver.emit("onStay", target, other);
    }

    protected _onExit(target: Node, other: Node): void {
        this._driver.emit("onExit", target, other);
    }
}
