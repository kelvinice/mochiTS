import Projectile from "./projectile";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Point from "../point";
import Enemy from "../enemies/enemy";
import HitEffect from "../hitEffect";
import GameScene from "../../scenes/gameScene";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";

export default class Arrow extends Projectile{
    image: ImageBitmap;
    hitImage: ImageBitmap;
    rotation: number;

    constructor(iGameObject: IRectangle, velocity: Point, image: ImageBitmap, hitImage: ImageBitmap) {
        super(iGameObject, velocity);
        this.image = image;
        this.hitImage = hitImage;
        this.rotation= 180+(Math.atan2(velocity.x,velocity.y) / (2* Math.PI) * 360 *-1);
        let sound = new Audio('assets/sounds/arrow.mp3');
        sound.play();
    }

    draw(ctx: CanvasRenderingContext2D) {
        let cx = this.x + 0.5 * this.width;   // x of shape center
        let cy = this.y + 0.5 * this.height;  // y of shape center

        super.draw(ctx);
        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * this.rotation );
        ctx.translate( -cx, -cy );
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height*2);
        ctx.restore();
    }

    onHit(enemy: Enemy) {
        super.onHit(enemy);
        let hitEffect: HitEffect = new HitEffect(<IRectangle>{
            x: this.x,
            y: this.y,
            width: GameScene.TILE_SIZE,
            height: GameScene.TILE_SIZE
        }, this.hitImage);
        SceneEngine.getInstance().injectGameObject(hitEffect);
    }
}