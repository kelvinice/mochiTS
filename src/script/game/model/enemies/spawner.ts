import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import GameScene from "../../scenes/gameScene";
import Slime from "./slime";
import Enemy from "./enemy";

export default class Spawner extends ImageGameObject{
    enemyImage: ImageBitmap;
    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);
    }

    update(): void {
    }


    constructor(iGameObject: IRectangle, image: ImageBitmap, enemyImage: ImageBitmap) {
        super(iGameObject, image);
        this.enemyImage = enemyImage;
    }

    spawn(): Enemy{
        let enemy = new Slime(<IRectangle>{
            x: this.x,
            y: this.y,
            width: GameScene.TILE_SIZE,
            height: GameScene.TILE_SIZE
        }, this.enemyImage);
        enemy.initHP(150);
        enemy.setZIndex(15);
        return enemy;

        // this.enemies.push(enemy);
        // this.addGameObject(enemy);
    }
}