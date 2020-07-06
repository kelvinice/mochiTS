import GameObject from '../../../../module/context/core/gameObject/gameObject';
import { IRectangle } from '../../../../module/context/core/gameObject/gameObject';
import ImageGameObject from "../../../../module/context/core/gameObject/imageGameObject";


export default class GameTile extends ImageGameObject{
    image: ImageBitmap;
    constructor(iGameObject: IRectangle, image: ImageBitmap){
        super(iGameObject, image);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }
    update(): void {
    
    }


}