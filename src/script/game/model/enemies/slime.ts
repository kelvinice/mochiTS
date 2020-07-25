import Enemy from "./enemy";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";
import global from "../../../../module/context/generals/global";

export default class Slime extends Enemy{
    constructor(iGameObject: IRectangle, image: ImageBitmap = null) {
        super(iGameObject, image);
        this.image = image;

        this.rectangles = splitSprite(image, 4, 4);
        this.animationController.addAnimation("down", 0, 3, 200);
        this.animationController.addAnimation("left", 4, 7, 200);
        this.animationController.addAnimation("right", 8, 11, 200);
        this.animationController.addAnimation("up", 12, 15, 200);

        this.animationController.setAnim("down");
        this.movementSpeed = 0.5;
        this.initHP(140);
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
            this.fillHitBox(ctx, "blue");
        }
        super.draw(ctx, time);
    }

    getHitBox(): IRectangle {
        return <IRectangle>{
            x: this.x + (this.width/3/2),
            y: this.y + this.height/2,
            width: this.width/3 * 2,
            height: this.height/2
        }
    }


}