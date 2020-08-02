import TimeCounter from "./timeCounter";
import BossBehavior from "../game/model/enemies/behaviors/bossBehavior";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import Boss from "../game/model/enemies/boss";
import GameScene from "../game/scenes/gameScene";
import IdleBehavior from "../game/model/enemies/behaviors/idleBehavior";

export default class BossBehaviorHandler {
    timeCounter: TimeCounter;
    bossBehavior: BossBehavior;
    boss: Boss;

    constructor(boss: Boss) {
        this.boss = boss;
        GameScene.spawnHandler.setWillSpawn(false);
        this.bossBehavior = new IdleBehavior(this);
        this.timeCounter = new TimeCounter(this.bossBehavior.behaviorDuration);
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
        this.timeCounter.setTargetTime(nextBehavior.behaviorDuration);
        this.bossBehavior = nextBehavior;
    }


}