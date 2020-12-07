import RectangleGameObject from "../../../../module/context/core/gameObjects/rectangleGameObject";

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
        super.draw(ctx, time);
        switch (this.point) {
            case 0:
                ctx.fillStyle = "black";
                break;
            case 1:
                ctx.fillStyle = "red";
                break;
            case 2:
                ctx.fillStyle = "blue";
                break;
            case 3:
                ctx.fillStyle = "green";
                break;
        }

        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    update(): void {
    }



}