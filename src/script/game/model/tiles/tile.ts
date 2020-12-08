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
        let assetManager: AssetManager = Global.getInstance().assetManager;
        super.draw(ctx, time);
        switch (this.point) {
            case 0:
                ctx.fillStyle = "black";
                break;
            // case 1:
            //     ctx.fillStyle = "red";
            //     break;
            // case 2:
            //     ctx.fillStyle = "blue";
            //     break;
            // case 3:
            //     ctx.fillStyle = "green";
            //     break;
            default:
                ctx.fillStyle = "transparent";
                break;
        }

        if(this.point > 0){
            image = Global.getInstance().assetManager.loadedImage[this.point];
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);
        if(image != null){
            ctx.drawImage(image, this.x, this.y, this.width, this.height)
        }

    }

    update(): void {
    }



}