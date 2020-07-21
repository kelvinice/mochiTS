import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../handlers/imageHandler";
import {FrameListener} from "../../../module/context/core/animations/animationController";

export default class HitEffect extends AnimateGameObject implements FrameListener{


    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);

        this.setZIndex(40);

        this.rectangles = splitSprite(image, 4, 1);
        this.animationController.addAnimation("hit", 0, 3, 150);

        this.animationController.setAnim("hit");
        this.animationController.addFrameListener(this);

        let sound = new Audio('assets/sounds/hit.mp3');
        sound.play();
    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        super.draw(ctx, time);
    }

    onFrameChanged(frameIndex: number): void {
        if(frameIndex== 3){
            this.destroy();
        }
    }




}