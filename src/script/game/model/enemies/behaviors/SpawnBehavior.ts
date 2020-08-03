import BossBehavior from "./bossBehavior";
import SpearBehavior from "./SpearBehavior";
import GameScene from "../../../scenes/gameScene";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";

export default class SpawnBehavior extends BossBehavior{
    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(7000, bossBehaviorHandler);
        GameScene.spawnHandler.changeAllSpawner();
        GameScene.spawnHandler.valueToSpawn = 1;
        GameScene.spawnHandler.setWillSpawn(true);
        let sound = new Audio('assets/sounds/boss_spawn.mp3');
        sound.play();
    }

    onBehaviorComplete(): void {
        GameScene.spawnHandler.setWillSpawn(false);
    }

    getNextBehavior(): BossBehavior {
        return new SpearBehavior(this.behaviorHandler);
    }

    onBehaviorUpdate() {
        // GameScene.spawnHandler.willSpawn = true;
    }

}