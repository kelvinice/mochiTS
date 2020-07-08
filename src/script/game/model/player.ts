import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import ImageGameObject from "../../../module/context/core/gameObjects/imageGameObject";

export default class Player extends ImageGameObject{
    tileX: number;
    tileY: number;

    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject,image);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }

    update(): void {
    }

    setTile(tileX: number, tileY: number){
        this.tileX = tileX;
        this.tileY = tileY;
    }

}