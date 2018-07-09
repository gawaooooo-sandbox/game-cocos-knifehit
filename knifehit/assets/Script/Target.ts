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
export default class Target extends cc.Component {

    @property
    rotationSpeed: number = 2;

    rotateAction: cc.Action = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // console.log('target onload');

        this.rotateAction = this.setRotateAction();
        this.node.runAction(this.rotateAction);

        this.node.setLocalZOrder(1);
    }

    start () {

    }

    // update (dt) {}

    setRotateAction() {
        // console.log(' call target setRotateAction');
        // rotation
        const action = cc.repeatForever(cc.rotateBy(this.rotationSpeed, 360));
        
        return action;
    }
}
