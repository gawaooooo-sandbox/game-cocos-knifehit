import ThrowKnife from "./ThrowKnife";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class OnTouchCtrl extends cc.Component {

    @property(cc.Node)
    canvas: cc.Node = null;

    @property(cc.Node)
    throwKnife: ThrowKnife = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log('ontouchctr onLoad');
        console.log(this.canvas);
        console.log(this.throwKnife);
        // add touch event
        this.canvas.on(cc.Node.EventType.TOUCH_START, (event) => {
            console.log(' game canvas click ???? ');
            console.log(this.throwKnife);
            this.throwKnife.throw();
        }, this.node);
    }

    start () {

    }

    // update (dt) {}
}
