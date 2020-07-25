import Spawner from "./spawner";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import GameScene from "../../scenes/gameScene";
import Enemy from "./enemy";
import Skeleton from "./skeleton";

export default class SkeletonSpawner extends Spawner{


    constructor(iGameObject: IRectangle, image: ImageBitmap, enemyImage: ImageBitmap) {
        super(iGameObject, image, enemyImage);

    }

    spawn(): Enemy {
        return new Skeleton(<IRectangle>{
            x: this.x,
            y: this.y,
            width: GameScene.TILE_SIZE,
            height: GameScene.TILE_SIZE
        }, this.enemyImage);
    }
}