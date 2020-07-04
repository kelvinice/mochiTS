import GameObject, {IGameObject} from "../../../module/context/core/gameObject";
import Point from "./point";

export default class Projectile extends GameObject{
    velocity: Point;

    constructor(iGameObject: IGameObject, velocity: Point) {
        super(iGameObject);
        this.velocity = velocity;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    update(): void {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }


}