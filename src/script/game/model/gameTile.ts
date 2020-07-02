import GameObject from '../../../module/context/core/gameObject';
import { IGameObject } from '../../../module/context/core/gameObject';

export default class GameTile extends GameObject{
    image;
    constructor(iGameObject: IGameObject, image){
        super(iGameObject);
        this.image = image;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }
    update(): void {
    
    }


}