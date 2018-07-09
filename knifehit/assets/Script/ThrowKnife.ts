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
export default class ThrowKnife extends cc.Component {

    throwSpeed: number = 0.2; // second

    throwActionSequence: cc.ActionInterval = null;

    fallOutActionSequence: cc.ActionInterval = null;

    canThrow: boolean = true;

    defaultPosition: cc.Vec2 = null;

    targetPosition: cc.Vec2 = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.defaultPosition = this.node.position;

        this.targetPosition = this.node.parent.getChildByName('target').position;

        this.setAction();
    }

    start () {

    }

    reset () {
        // console.log('call throwknife reset ');
        this.canThrow = true;
        this.node.setPosition(this.defaultPosition);
    }

    setAction () {
        const throwAction = cc.moveTo(this.throwSpeed, cc.p(0, this.targetPosition.y - this.node.height / 2));
        this.throwActionSequence = cc.sequence(throwAction, cc.callFunc(this.throwComplete.bind(this)));

        const fallOutMove = cc.moveTo(this.throwSpeed * 3, cc.p(0, this.defaultPosition.y - this.node.height * 2));
        const fallOutRotate = cc.rotateBy(this.throwSpeed * 3, 360);
        this.fallOutActionSequence = cc.sequence(cc.spawn(fallOutMove, fallOutRotate), cc.callFunc(this.fallOutComplete.bind(this)));
    }

    throw () {
        // console.log(' call throw knife throw');

        if (!this.canThrow) {
            console.log(' can not throw knife ');
            return;
        }

        this.canThrow = false;

        this.node.runAction(this.throwActionSequence);
    }

    throwComplete () {
        // console.log(' call throw complete ');

        if(this.node.parent.getComponent('Game').checkHit()) {
            this.reset();
        } else {
            this.fallOut();
        }
    }

    fallOut () {
        // console.log(' fallout throw knife ');
        this.node.runAction(this.fallOutActionSequence);
    }

    fallOutComplete () {
        // console.log(' fallout complete ');
        this.reset();
        this.node.parent.getComponent('Game').gameOver();
    }

    // update (dt) {}
}
