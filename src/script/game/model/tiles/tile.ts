import RectangleGameObject from "../../../../module/context/core/gameObjects/rectangleGameObject";
import AssetManager from "../../../../module/context/generals/asset";
import Global from "../../../../module/context/generals/global";

export default class Tile extends RectangleGameObject {
    point: number;
    xMap: number;
    yMap: number;

    init(): void{

    }

    constructor(point: number, y: number, x: number, size: number){
        super({
            x: x * size,
            y: y * size,
            width: size,
            height: size
        });

        this.init();
        this.point = point;
        this.xMap = x;
        this.yMap = y;
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        let image = null;
        super.draw(ctx, time);
        if(this.point > 0){
            image = Global.getInstance().assetManager.loadedImage[this.point];
        }

        if(image != null){
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }

    }

    update(): void {
    }



}