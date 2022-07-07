import GameObject, {IRectangle} from "./game-object";

export default class RectangleGameObject extends GameObject{
    draw(ctx: CanvasRenderingContext2D, time: Number): void {
    }

    update(): void {
    }

    constructor(iRectangle: IRectangle) {
        super(iRectangle);
    }
}