import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Point from "./point";
import Calculator from "../../handlers/calculator";
import global from "../../../module/context/generals/global";
import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {splitSprite} from "../../handlers/imageHandler";

export default class Player extends AnimateGameObject{
    tileX: number;
    tileY: number;
    bowImage: ImageBitmap;
    private _mousePoint: Point;
    velX: number = 0;
    velY: number = 0;
    movementSpeed: number;

    get mousePoint(): Point {
        return this._mousePoint;
    }

    constructor(iGameObject: IRectangle, image: ImageBitmap, bowImage: ImageBitmap) {
        super(iGameObject, image);
        this.bowImage = bowImage;
        this._mousePoint = new Point();
        this.movementSpeed = 1;
        this.setZIndex(20);

        this.rectangles = splitSprite(image, 4, 4);
        this.animationController.addAnimation("down", 0, 3, 200);
        this.animationController.addAnimation("left", 4, 7, 200);
        this.animationController.addAnimation("right", 8, 11, 200);
        this.animationController.addAnimation("up", 12, 15, 200);
        this.animationController.addAnimation("idle", 0, 0, 100);
        this.animationController.setAnim("idle");
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "purple");
        }
        super.draw(ctx, time);

        let p: Point = new Point(this.x, this.y);

        let vel = Calculator.calculateVelocity(p, this.mousePoint);

        let rotation= 180+(Math.atan2(vel.x,vel.y) / (2* Math.PI) * 360 *-1);

        p.x += vel.x * 20;
        p.y += vel.y * 20;

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

        if(this.velX == 0 && this.velY == 0){
            this.animationController.setAnim("idle");
        }else if(this.velX > 0){
            this.animationController.setAnim("right");
        }else if(this.velX < 0){
            this.animationController.setAnim("left");
        }else if(this.velY < 0){
            this.animationController.setAnim("up");
        }else if(this.velY > 0){
            this.animationController.setAnim("down");
        }
    }

    setTile(tileX: number, tileY: number){
        this.tileX = tileX;
        this.tileY = tileY;
    }

    setMousePoint(point: Point): void{
        this._mousePoint = point;
    }

    getHitBox(): IRectangle {
        return <IRectangle>{
            x: this.x + (this.width/4/2),
            y: this.y + this.height/4/2,
            width: this.width/4*3,
            height: this.height/4*3
        }
    }

}