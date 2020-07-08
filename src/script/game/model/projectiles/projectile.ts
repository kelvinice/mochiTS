import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Point from "../point";
import Enemy from "../enemies/enemy";

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
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    update(): void {
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }

    onHit(enemy: Enemy){
        if(this.isDestroyed)return;
        enemy.reduceHP(50);
        this.destroy();
    }


}