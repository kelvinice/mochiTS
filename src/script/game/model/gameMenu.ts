import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";

export default class GameMenu extends GameObject{


    constructor(iGameObject: IRectangle) {
        super(iGameObject);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    update(): void {
    }



}