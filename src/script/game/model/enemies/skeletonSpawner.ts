import Spawner from "./spawner";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import GameScene from "../../scenes/gameScene";
import Enemy from "./enemy";
import Skeleton from "./skeleton";
import Global from "../../../../module/context/generals/global";

export default class SkeletonSpawner extends Spawner{
    constructor(iGameObject: IRectangle) {
        super(iGameObject,
            Global.getInstance().assetManager.loadedImage["switchRed"],
            Global.getInstance().assetManager.loadedImage["skeleton"]);

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