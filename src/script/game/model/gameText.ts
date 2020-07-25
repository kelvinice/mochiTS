import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Point from "./point";

export default class GameText extends GameObject{
    color: string;
    text: string;
    fontSize: number;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.font = "bold "+this.fontSize+"pt arial"
        ctx.fillStyle = this.color;
        ctx.fillText(this.text,this.x, this.y);
    }

    update(): void {
    }


    constructor(point: Point, text: string) {
        super(<IRectangle>{
            x: point.x,
            y: point.y,
            width: 0,
            height: 0
        });
        this.setZIndex(60);
        this.color = "black";
        this.fontSize = 10;
        this.text = text;
    }

    setColor(color: string): GameText{
        this.color = color;
        return this;
    }

    setText(text:string): GameText{
        this.text = text;
        return this;
    }

    setFontSize(fontSize: number): GameText{
        this.fontSize = fontSize;
        return this;
    }


}