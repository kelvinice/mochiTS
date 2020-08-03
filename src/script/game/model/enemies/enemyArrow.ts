import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import global from "../../../../module/context/generals/global";
import Player from "../player";
import Point from "../point";
import Global from "../../../../module/context/generals/global";
import GameScene from "../../scenes/gameScene";

export default class EnemyArrow extends ImageGameObject{
    rotation: number;
    target: Player;
    velX: number;
    velY: number;
    speed: number;

    constructor(iRectangle: IRectangle, target: Player) {
        super(iRectangle,global.getInstance().assetManager.loadedImage["dark-arrow"]);
        this.target = target;
        this.setZIndex(20);
        this.speed = 0;
        this.rotation = 0;
        this.velX = 0;
        this.velY = 0;
    }

    checkOutOfRange(){
        if(this.x < 0 - GameScene.TILE_SIZE || this.y < 0 - GameScene.TILE_SIZE ||
            this.x +this.width > Global.getInstance().width + GameScene.TILE_SIZE
            || this.y + this.height > Global.getInstance().height + GameScene.TILE_SIZE
        ){
            this.destroy();
        }
    }

    update() {
        if(this.speed > 0){
            this.x += this.velX * this.speed;
            this.y += this.velY * this.speed;
            this.checkOutOfRange();
            if(this.target.isCollide(this)){
                this.target.onHitWithEnemy();
                this.destroy();
            }
        }


    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "orange");
        }
        let cx = this.x + 0.5* this.width;   // x of shape center
        let cy = this.y + 0.5* this.height;  // y of shape center

        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * this.rotation );
        ctx.translate( -cx, -cy );
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height*2);
        ctx.restore();
    }

    setVel(point: Point){
        this.velX = point.x;
        this.velY = point.y;
        this.rotation= 180+(Math.atan2(this.velX,this.velY) / (2* Math.PI) * 360 *-1);
    }
}