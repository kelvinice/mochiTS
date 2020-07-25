import Spawner from "./spawner";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Global from "../../../../module/context/generals/global";
import Enemy from "./enemy";
import GameScene from "../../scenes/gameScene";
import Slime from "./slime";

export default class SlimeSpawner extends Spawner{
    constructor(iGameObject: IRectangle) {
        super(iGameObject,
            Global.getInstance().assetManager.loadedImage["switchGreen"],
            Global.getInstance().assetManager.loadedImage["slime"]);

    }

    spawn(): Enemy {
        return new Slime(<IRectangle>{
            x: this.x,
            y: this.y,
            width: GameScene.TILE_SIZE,
            height: GameScene.TILE_SIZE
        }, this.enemyImage);
    }
}