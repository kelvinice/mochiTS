import BossBehavior from "./bossBehavior";
import SuckBehavior from "./SuckBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";
import TimeCounter from "../../../../handlers/timeCounter";
import SceneEngine from "../../../../../module/context/core/scene/sceneEngine";
import TrueRandom from "../../../../handlers/trueRandom";
import EnemySunStrike from "../enemySunStrike";
import GameScene from "../../../scenes/gameScene";

export default class SunStrikeBehavior extends BossBehavior{
    private sunStrikeTimer: TimeCounter;
    private trueRandom: TrueRandom;

    onBehaviorComplete(): void {
    }

    getNextBehavior(): BossBehavior {
        return new SuckBehavior(this.behaviorHandler);
    }

    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(5000, bossBehaviorHandler);
        this.sunStrikeTimer = new TimeCounter(500);
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }

    onBehaviorUpdate() {
        if(this.sunStrikeTimer.updateTimeCounter(SceneEngine.getInstance().deltaTimeMilli())){
            let player = this.behaviorHandler.boss.player;
            let posX = this.trueRandom.randomNumber(player.x - (GameScene.TILE_SIZE * 3), player.x + (GameScene.TILE_SIZE * 3));
            let posY = this.trueRandom.randomNumber(player.y - (GameScene.TILE_SIZE * 3), player.y + (GameScene.TILE_SIZE * 3));

            let ss = new EnemySunStrike({
                x: posX,
                y: posY,
                width: GameScene.TILE_SIZE,
                height: GameScene.TILE_SIZE
            }, player);
            SceneEngine.getInstance().injectGameObject(ss);
        }
    }
}