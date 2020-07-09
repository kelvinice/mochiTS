import GameObject, {IRectangle} from "./gameObject";

export default class RectangleGameObject extends GameObject{
    draw(ctx: CanvasRenderingContext2D, time: Number): void {
    }

    update(): void {
    }


    constructor(iGameObject: IRectangle) {
        super(iGameObject);
    }
}