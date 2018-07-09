const {ccclass, property} = cc._decorator;

@ccclass
export default class hitKnife extends cc.Component {

    @property
    hitAngle: number = 0;

    @property
    rotationSpeed: number = 2;

    rotationAction: cc.Action = null;

    targetX: number = 0;
    targetY: number = 0;
    targetWidth: number = 0;

    targetAngle: number = -90;
    angle: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {
    }

    setHitAngle (r: number) {
        this.hitAngle = r;

        // console.log('hitknife hit rotation : ' + this.hitAngle);
    }

    setTargetInfo (targetX, targetY, targetWidth) {
        this.targetX = targetX;
        this.targetY = targetY;
        this.targetWidth = targetWidth;
    }

    gameOver () {
        console.log('   HITKNIFE GAME OVER    ');
        this.node.destroy();
    }    

    update (dt) {
        // const rad = (this.node.rotation + 90) * Math.PI / 180;
        // const rad = (this.node.rotation) * Math.PI / 180;
        // this.r -= this.rotationSpeed;
        this.targetAngle = this.targetAngle - this.rotationSpeed * 1.5;
        const rad = this.targetAngle * Math.PI / 180;
        const x = this.targetX + this.targetWidth / 2 * Math.cos(rad);
        const y = this.targetY + this.targetWidth / 2 * Math.sin(rad);

        this.angle = -this.targetAngle - 90;

        this.node.setPosition(x, y);
        this.node.rotation = this.angle;
    }
}
