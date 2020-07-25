import {IRectangle} from "./gameObject";
import ImageGameObject from "./imageGameObject";
import AnimationController from "../animations/animationController";

export default class AnimateGameObject extends ImageGameObject{
    protected animationController: AnimationController;
    protected rectangles: IRectangle[];
    protected previousTime: number;

    constructor(iRectangle: IRectangle, image: ImageBitmap) {
        super(iRectangle, image);
        this.animationController = new AnimationController();
        this.previousTime = Number(-1);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        let rect = this.rectangles[this.animationController.index];

        ctx.drawImage(this.image,
            rect.x,
            rect.y,
            rect.width,
            rect.height,
            this.x-this.leftPadding,this.y-this.topPadding
            ,this.width + this.leftPadding + this.rightPadding,this.height + this.topPadding + this.bottomPadding
        );
        if(this.previousTime.valueOf() != -1){
            this.animationController.updateAnimation(time.valueOf() - this.previousTime.valueOf());
        }
        this.previousTime = Number(time);
    }

    update(): void {

    }

}