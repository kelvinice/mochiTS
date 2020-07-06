import {IRectangle} from "./gameObject";
import ImageGameObject from "./imageGameObject";
import AnimationController from "../animations/animationController";

export default class AnimateGameObject extends ImageGameObject{
    animationController: AnimationController;

    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
        this.animationController = new AnimationController();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        let animation = this.animationController.activeAnimation;
        let rect = animation.rect;

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

    }

    update(): void {
    }

}