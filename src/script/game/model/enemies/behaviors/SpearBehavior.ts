import BossBehavior from "./bossBehavior";
import SunStrikeBehavior from "./SunStrikeBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";
import EnemyArrow from "../enemyArrow";
import GameScene from "../../../scenes/gameScene";
import SceneEngine from "../../../../../module/context/core/scene/sceneEngine";
import calculator from "../../../../handlers/calculator";
import player from "../../player";
import Player from "../../player";

export default class SpearBehavior extends BossBehavior{
    spears: EnemyArrow[];

    onBehaviorComplete(): void {
        let spears = [...this.spears];

        for (const spear of spears) {
            spear.speed = 5;
        }
    }


    getNextBehavior(): BossBehavior {
        return new SunStrikeBehavior(this.behaviorHandler);
    }


    addSpear(x: number, y: number, target: Player){
        let projectileSize = GameScene.TILE_SIZE * 2 /3;
        let spear = new EnemyArrow({
            x: x,
            y: y,
            width: projectileSize,
            height: projectileSize
        }, target);
        this.spears.push(spear);
        SceneEngine.getInstance().injectGameObject(spear);
    }

    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(5000, bossBehaviorHandler);
        this.spears = [];
        let boss = this.behaviorHandler.boss;
        this.addSpear(boss.x - GameScene.TILE_SIZE,boss.y - GameScene.TILE_SIZE, boss.player);
        this.addSpear(boss.x - GameScene.TILE_SIZE,boss.y + GameScene.TILE_SIZE + boss.height, boss.player);
        this.addSpear(boss.x + GameScene.TILE_SIZE + boss.width,boss.y - GameScene.TILE_SIZE, boss.player);
        this.addSpear(boss.x + GameScene.TILE_SIZE + boss.width,boss.y + GameScene.TILE_SIZE + boss.height, boss.player);
    }

    onBehaviorUpdate() {
        super.onBehaviorUpdate();

        let player = this.behaviorHandler.boss.player;

        let spears = [...this.spears];

        for (const spear of spears) {
            spear.setVel(calculator.calculateVelocity(spear.getMiddlePoint(), player.getMiddlePoint()));
        }

    }
}