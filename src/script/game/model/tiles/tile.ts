import RectangleGameObject from "../../../../module/context/core/gameObjects/rectangle-game-object";
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

        // draw image
        if(image != null){
            // ctx.drawImage(image, this.x, this.y, this.width, this.height);
            let xGap = 0;
            if(this.point == 3){
                xGap = this.width * (Global.getInstance().flipNum%100)/100;
                if(Global.getInstance().flipNum > 100){
                    ctx.drawImage(image, this.x+ this.width, this.y, -this.width, this.height);
                }else {
                    ctx.drawImage(image, this.x+ xGap, this.y, this.width - xGap*2, this.height);
                }
            }else{
                ctx.drawImage(image, this.x+ xGap, this.y, this.width - xGap*2, this.height);
            }


        }

    }

    update(): void {



    }



}