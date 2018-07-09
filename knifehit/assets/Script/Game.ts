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
export default class Game extends cc.Component {

    @property (cc.Node)
    target: cc.Node = null;

    @property (cc.Node)
    throwKnife: cc.Node = null;

    @property (cc.Prefab)
    knifePrefab: cc.Prefab = null;

    throwKnifeComponent: ThrowKnife;

    hitKnifes: Array<cc.Node> = [];

    hitAngleDiff: number = 10;
    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.setClearColor(cc.color(68, 68, 68));

        this.throwKnifeComponent = this.throwKnife.getComponent('ThrowKnife');
        
        this.setClickEvent();
    }

    start () {

    }

    // update (dt) {}

    setClickEvent () {
        this.node.on(cc.Node.EventType.TOUCH_START, event => {
            this.throwKnifeComponent.throw();            
        });
    }

    addKnife (targetRotation: number) {
        // targetの角度
        // console.log(`current target rotation: ${this.target.rotation}`);

        // throw knifeの位置
        // console.log(`throw knife position x: ${this.throwKnife.position.x}, y: ${this.throwKnife.position.y}`);

        const knife = cc.instantiate(this.knifePrefab);
        this.node.addChild(knife);

        knife.setPosition(0, this.target.position.y - knife.height / 2);
        
        const knifeComponent = knife.getComponent('HitKnife');
        knifeComponent.setTargetInfo(this.target.position.x, this.target.position.y, this.target.width);
        knifeComponent.setHitAngle(targetRotation);

        // console.log(`hit knife rotation after: ${knifeComponent.hitAngle}`);

        // console.log(`get children count: ${this.node.childrenCount}`);

        this.hitKnifes.push(knife);
    }

    gameOver () {
        console.log('!!! game over !!! ');

        for (let i = 0; i < this.hitKnifes.length; i+= 1) {
            const knife = this.hitKnifes[i];
            const knifeComponent = knife.getComponent('HitKnife');
            knifeComponent.gameOver();
        }

        this.hitKnifes = [];
    }


    checkHit () {
        let isLegalHit = true;
        const targetRotation = this.target.rotation % 360;
        for (let i = 0; i < this.hitKnifes.length; i += 1) {
            const knife = this.hitKnifes[i];
            const knifeComponent = knife.getComponent('HitKnife');
            if (Math.abs(targetRotation - knifeComponent.hitAngle) < this.hitAngleDiff) {
                isLegalHit = false;
                // this.gameOver();
                break;
            }
        }
        if (isLegalHit) {
            this.addKnife(targetRotation);
        }
        return isLegalHit;
    }
}
