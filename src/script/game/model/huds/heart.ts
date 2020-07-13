import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";

export default class Heart extends ImageGameObject{
    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);
    }

    update(): void {
    }


}