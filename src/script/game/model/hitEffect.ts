import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../handlers/imageHandler";
import {FrameListener} from "../../../module/context/core/animations/animationController";
import global from "../../../module/context/generals/global";

export default class HitEffect extends AnimateGameObject implements FrameListener{


    constructor(iGameObject: IRectangle) {
        super(iGameObject, global.getInstance().assetManager.loadedImage["hit"]);

        this.setZIndex(40);

        this.rectangles = splitSprite(this.image, 4, 1);
        this.animationController.addAnimation("hit", 0, 3, 100);

        this.animationController.setAnim("hit");
        this.animationController.addFrameListener(this);

        let sound = new Audio('assets/sounds/hit.mp3');
        sound.addEventListener("canplaythrough", ()=>{
            sound.play();
        })

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