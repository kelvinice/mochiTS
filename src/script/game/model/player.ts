import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import ImageGameObject from "../../../module/context/core/gameObjects/imageGameObject";
import Point from "./point";

export default class Player extends ImageGameObject{
    tileX: number;
    tileY: number;
    bowImage: ImageBitmap;
    mousePoint: Point;
    velX: number = 0;
    velY: number = 0;
    movementSpeed: number;

    constructor(iGameObject: IRectangle, image: ImageBitmap, bowImage: ImageBitmap) {
        super(iGameObject, image);
        this.bowImage = bowImage;
        this.mousePoint = new Point();
        this.movementSpeed = 1;
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);

        let p: Point = new Point(this.x, this.y);
        // let p: Point = this.getMiddlePoint();

        let xDif = this.mousePoint.x - p.x;
        let yDif = this.mousePoint.y - p.y;
        let dif = Math.abs(xDif)+ Math.abs(yDif);
        let maxVel= 1;

        let xVel = xDif/dif * maxVel;
        let yVel = yDif/dif * maxVel;

        let rotation= 180+(Math.atan2(xVel,yVel) / (2* Math.PI) * 360 *-1);

        p.x += xVel * 20;
        p.y += yVel * 20;

        let cx     = p.x + 0.5 * this.width;   // x of shape center
        let cy     = p.y + 0.5 * this.height;  // y of shape center

        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * rotation );
        ctx.translate( -cx, -cy );

        ctx.drawImage(this.bowImage,p.x,p.y,this.width,this.height);
        ctx.restore();

    }

    update(): void {
        super.update();
        this.x+=this.velX * this.movementSpeed;
        this.y+=this.velY * this.movementSpeed;
    }

    setTile(tileX: number, tileY: number){
        this.tileX = tileX;
        this.tileY = tileY;
    }

    setMousePoint(point: Point): void{
        this.mousePoint = point;

    }



}