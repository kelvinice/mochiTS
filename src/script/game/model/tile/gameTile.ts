import GameObject from '../../../../module/context/core/gameObject';
import { IGameObject } from '../../../../module/context/core/gameObject';
import ImageGameObject from "../../../../module/context/core/imageGameObject";


export default class GameTile extends ImageGameObject{
    image: ImageBitmap;
    constructor(iGameObject: IGameObject, image: ImageBitmap){
        super(iGameObject,image);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }
    update(): void {
    
    }


}