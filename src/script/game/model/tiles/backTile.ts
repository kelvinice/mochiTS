import GameObject from '../../../../module/context/core/gameObjects/gameObject';
import { IRectangle } from '../../../../module/context/core/gameObjects/gameObject';
import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import Global from "../../../../module/context/generals/global";


export default class BackTile extends ImageGameObject{
    image: ImageBitmap;
    point: number;

    constructor(iGameObject: IRectangle, point: number){
        super(iGameObject, Global.getInstance().assetManager.loadedImage["circuit"]);
        this.point = point;
        if(point > 0){
            this.setZIndex(-1);
        }else{
            this.setZIndex(10);
        }

    }

    draw(ctx: CanvasRenderingContext2D, time: number): void {
        if(this.point > 0){
            ctx.globalAlpha = 0.5;
        }

        super.draw(ctx, time);
        ctx.globalAlpha = 1;


    }
    update(): void {
    
    }


}