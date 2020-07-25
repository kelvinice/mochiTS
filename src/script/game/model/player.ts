import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Point from "./point";
import Calculator from "../../handlers/calculator";
import global from "../../../module/context/generals/global";
import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {splitSprite} from "../../handlers/imageHandler";
import Global from "../../../module/context/generals/global";

export default class Player extends AnimateGameObject{
    tileX: number;
    tileY: number;
    bowImage: ImageBitmap;
    fireBallImage: ImageBitmap;
    private _mousePoint: Point;
    velX: number = 0;
    velY: number = 0;
    movementSpeed: number;
    fireRotation: number;
    exort: number;

    get mousePoint(): Point {
        return this._mousePoint;
    }

    constructor(iGameObject: IRectangle) {
        super(iGameObject, Global.getInstance().assetManager.loadedImage["player"]);
        this.bowImage = Global.getInstance().assetManager.loadedImage["bow"];
        this.fireBallImage = Global.getInstance().assetManager.loadedImage["fireball"];
        this._mousePoint = new Point();
        this.movementSpeed = 1;
        this.setZIndex(20);

        this.rectangles = splitSprite(this.image, 4, 4);
        this.animationController.addAnimation("down", 0, 3, 200);
        this.animationController.addAnimation("left", 4, 7, 200);
        this.animationController.addAnimation("right", 8, 11, 200);
        this.animationController.addAnimation("up", 12, 15, 200);
        this.animationController.addAnimation("idle", 0, 0, 100);
        this.animationController.setAnim("idle");

        this.fireRotation = 0;
        this.exort = 0;
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "purple");
        }
        super.draw(ctx, time);

        this.fireRotation = this.fireRotation +1 %360;

        //Draw Fire Start
        let fireSize  =this.width/3;

        for (let i = 0; i < this.exort; i++) {
            this.drawFire(ctx, new Point(this.x + this.width/2 - (fireSize/2), this.y - (this.width/2)), fireSize, 360/this.exort * i);
        }

        //Draw Fire End


        //Draw Bow Start
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

        //Draw Bow End
    }

    drawFire(ctx: CanvasRenderingContext2D, firePoint: Point, fireSize: number, fireRad: number){
        let cx1     = this.getMiddlePoint().x ;   // x of shape center
        let cy1     = this.getMiddlePoint().y;  // y of shape center

        ctx.save();
        ctx.translate( cx1, cy1 );
        ctx.rotate( (Math.PI / 180) * (this.fireRotation + fireRad));
        ctx.translate( -cx1, -cy1 );


        ctx.drawImage(this.fireBallImage, firePoint.x, firePoint.y, fireSize, fireSize);
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

    addExort(){
        this.exort += 1;
        if(this.exort > 9) this.exort = 9;
    }

    useSkill(): boolean{
        if(this.exort>= 3){
            this.exort-=3;
            return true;
        }
        return false;
    }

}