import Enemy from "./enemy";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";
import global from "../../../../module/context/generals/global";

export default class Skeleton extends Enemy{


    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
        this.image = image;

        this.rectangles = splitSprite(image, 9, 4);
        this.animationController.addAnimation("up", 0, 8, 100);
        this.animationController.addAnimation("left", 9, 17, 100);
        this.animationController.addAnimation("down", 18, 26, 100);
        this.animationController.addAnimation("right", 27, 35, 100);

        this.animationController.setAnim("down");
        this.movementSpeed = 1;
        this.initHP(100);
    }

    update() {
        super.update();
        if(this.velX > 0){
            this.animationController.setAnim("right");
        }else if(this.velX < 0){
            this.animationController.setAnim("left");
        }else if(this.velY < 0){
            this.animationController.setAnim("up");
        }else if(this.velY > 0){
            this.animationController.setAnim("down");
        }
    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "red");
        }
        super.draw(ctx, time);
    }

    getHitBox(): IRectangle {
        return <IRectangle>{
            x: this.x + (this.width/2/2),
            y: this.y + (this.height/9),
            width: this.width/2,
            height: this.height/9*8
        }
    }
}