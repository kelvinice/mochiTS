import GameObject, {IRectangle} from "../../../module/context/core/gameObject/gameObject";
import Point from "./point";

export default class Projectile extends GameObject{
    velocity: Point;
    speed: number = 1;

    constructor(iGameObject: IRectangle, velocity: Point) {
        super(iGameObject);
        this.velocity = velocity;
    }

    setSpeed(speed: number): Projectile{
        this.speed = speed;
        return this;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    update(): void {
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }


}