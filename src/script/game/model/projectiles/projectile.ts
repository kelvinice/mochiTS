import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Point from "../point";
import Enemy from "../enemies/enemy";
import Global from "../../../../module/context/generals/global";
import global from "../../../../module/context/generals/global";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";
import TextEffect from "../textEffect";
import TrueRandom from "../../../handlers/trueRandom";

export default class Projectile extends GameObject{
    velocity: Point;
    speed: number = 1;
    damage: number;
    trueRandom: TrueRandom;

    constructor(iGameObject: IRectangle, velocity: Point) {
        super(iGameObject);
        this.velocity = velocity;
        this.damage = 40;
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }

    setSpeed(speed: number): Projectile{
        this.speed = speed;
        return this;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "green");
        }
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

        let outDamage = this.trueRandom.randomNumber(this.damage - 10, this.damage + 10);

        SceneEngine.getInstance().injectGameObject(new TextEffect(
            {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            },outDamage+""
        ).setColor("white"));

        enemy.reduceHP(outDamage);
        this.destroy();
    }


}