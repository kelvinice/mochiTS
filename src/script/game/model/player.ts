import GameObject, {IRectangle} from "../../../module/context/core/gameObject/gameObject";
import ImageGameObject from "../../../module/context/core/gameObject/imageGameObject";

export default class Player extends ImageGameObject{

    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject,image);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }

    update(): void {
    }

}