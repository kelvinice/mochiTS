import TimeCounter from "./timeCounter";
import BossBehavior from "../game/model/enemies/behaviors/bossBehavior";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import SuckBehavior from "../game/model/enemies/behaviors/SuckBehavior";
import Boss from "../game/model/enemies/boss";
import GameScene from "../game/scenes/gameScene";

export default class BossBehaviorHandler {
    timeCounter: TimeCounter;
    bossBehavior: BossBehavior;
    boss: Boss;

    constructor(boss: Boss) {
        this.timeCounter = new TimeCounter(1000);
        this.bossBehavior = new SuckBehavior(this);
        this.boss = boss;
        GameScene.spawnHandler.setWillSpawn(false);
    }

    update(){
        this.bossBehavior.onBehaviorUpdate();
        if(this.timeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
            this.bossBehavior.onBehaviorComplete();
            this.boss.blink();
            this.updateBehavior(this.bossBehavior.getNextBehavior());

        }

    }

    updateBehavior(nextBehavior: BossBehavior){
        this.timeCounter.targetTime = nextBehavior.behaviorDuration;
        this.bossBehavior = nextBehavior;
    }


}