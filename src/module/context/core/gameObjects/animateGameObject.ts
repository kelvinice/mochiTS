import {IRectangle} from "./gameObject";
import ImageGameObject from "./imageGameObject";
import AnimationController from "../animations/animationController";

export default class AnimateGameObject extends ImageGameObject{
    protected animationController: AnimationController;
    protected rectangles: IRectangle[];
    protected previousTime: number;

    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
        this.animationController = new AnimationController();
        this.previousTime = Number(0);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        // let animation = this.animationController.activeAnimation;
        let rect = this.rectangles[this.animationController.index];

        ctx.drawImage(this.image,
            rect.x,
            rect.y,
            rect.width,
            rect.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
        this.animationController.updateAnimation(time.valueOf() - this.previousTime.valueOf());
        this.previousTime = Number(time);
    }

    update(): void {

    }

}