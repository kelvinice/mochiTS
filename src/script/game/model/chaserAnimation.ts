import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Point from "./point";
import Boss from "./enemies/boss";
import ImageGameObject from "../../../module/context/core/gameObjects/imageGameObject";
import Global from "../../../module/context/generals/global";
import global from "../../../module/context/generals/global";

export default class ChaserAnimation extends ImageGameObject{
    target: Boss;
    rotation: number;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "black");
        }
        let cx = this.x +  this.width;   // x of shape center
        let cy = this.y +  this.height;  // y of shape center

        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * this.rotation );
        ctx.translate( -cx, -cy );

        super.draw(ctx, time);

        ctx.restore();
    }

    update(): void {
        this.rotation = (this.rotation + 1) %360;

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
            this.target.hp+=5;
            if(this.target.hp > this.target.maxHp)this.target.hp = this.target.maxHp;
            this.destroy();
        }

    }


    constructor(iRectangle: IRectangle, target: Boss) {
        super(iRectangle, Global.getInstance().assetManager.loadedImage["energy"]);
        this.target = target;
        this.setZIndex(20);
        this.rotation = 0;
    }
}