import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Point from "../point";
import Enemy from "../enemies/enemy";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";
import Global from "../../../../module/context/generals/global";

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
        this.checkOutOfRange();
    }

    checkOutOfRange(){
        if(this.x < 0 || this.y < 0 ||
        this.x +this.width > Global.getInstance().width
            || this.y + this.height > Global.getInstance().height
        ){
            this.destroy();
        }
    }

    onHit(enemy: Enemy){
        if(this.isDestroyed)return;
        enemy.reduceHP(40);
        this.destroy();
    }


}