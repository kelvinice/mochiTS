import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../handlers/imageHandler";
import {FrameListener} from "../../../module/context/core/animations/animationController";
import global from "../../../module/context/generals/global";
import TrueRandom from "../../handlers/trueRandom";

export default class HitEffect extends AnimateGameObject implements FrameListener{
    rotation: number;

    constructor(iGameObject: IRectangle) {
        super(iGameObject, global.getInstance().assetManager.loadedImage["hit"]);

        this.setZIndex(110);

        this.rectangles = splitSprite(this.image, 5, 2);
        this.animationController.addAnimation("hit", 0, 7, 10);

        this.animationController.setAnim("hit");
        this.animationController.addFrameListener(this);


        // let sound = new Audio('assets/sounds/hit.mp3');
        // sound.addEventListener("canplaythrough", ()=>{
        //     sound.play();
        // })

        let trueRandom = new TrueRandom();
        trueRandom.randSeed();

        this.rotation = (trueRandom.randomNumber(0,359) + 1) %360;

    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        let cx = this.x + 0.5* this.width;   // x of shape center
        let cy = this.y + 0.5* this.height;  // y of shape center

        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * this.rotation );
        ctx.translate( -cx, -cy );

        super.draw(ctx, time);

        ctx.restore();

    }

    onFrameChanged(frameIndex: number): void {
        if(frameIndex== 7){
            this.destroy();
        }
    }

    update() {
        super.update();
        this.rotation = (this.rotation + 3) %360;
    }


}