import Enemy from "./enemy";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";

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
    }

    update() {
        super.update();
        this.x++;
    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        super.draw(ctx, time);


    }


}