import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Point from "./point";
import Boss from "./enemies/boss";

export default class ChaserAnimation extends GameObject{
    target: Boss;
    rotation: number;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(this.x, this.y, this. width, this.height);
    }

    update(): void {
        let targetPoint = this.target.getMiddlePoint();
        let selfPoint = this.getMiddlePoint();

        let xDis = Math.abs(targetPoint.x - selfPoint.x);
        let yDis = Math.abs(targetPoint.y - selfPoint.y);

        let totalDistance = xDis + yDis;
        let xVel = xDis / totalDistance;
        let yVel = yDis / totalDistance;

        let speed = 3;
        let xMult = 1;
        let yMult = 1;
        if(targetPoint.x < selfPoint.x)xMult = -1;
        if(targetPoint.y < selfPoint.y)yMult = -1;

        this.setMiddlePoint(new Point(selfPoint.x + (xMult * speed * xVel),
            selfPoint.y + (yMult * speed * yVel)
            ))

        if(this.isCollide(this.target)){
            this.target.hp+=3;
            if(this.target.hp > this.target.maxHp)this.target.hp = this.target.maxHp;
            this.destroy();
        }


    }


    constructor(iRectangle: IRectangle, target: Boss) {
        super(iRectangle);
        this.target = target;
        this.setZIndex(20);
    }
}