import BossBehavior from "./bossBehavior";
import SpawnBehavior from "./SpawnBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";
import TimeCounter from "../../../../handlers/timeCounter";
import SceneEngine from "../../../../../module/context/core/scene/sceneEngine";
import TrueRandom from "../../../../handlers/trueRandom";
import GameScene from "../../../scenes/gameScene";
import ChaserAnimation from "../../chaserAnimation";

export default class SuckBehavior extends BossBehavior{
    timeCounter: TimeCounter;
    trueRandom: TrueRandom;
    sound: HTMLAudioElement;

    onBehaviorComplete(): void {
        this.sound.pause();
    }

    getNextBehavior(): BossBehavior {
        return new SpawnBehavior(this.behaviorHandler);
    }

    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(5000, bossBehaviorHandler);
        this.timeCounter = new TimeCounter(100);
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
        this.sound = new Audio('assets/sounds/drain.mp3');
        this.sound.loop = true;
        this.sound.play();
    }

    onBehaviorUpdate() {
        super.onBehaviorUpdate();

        if(this.timeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMilli())){
            let player = this.behaviorHandler.boss.player;
            let size = this.trueRandom.randomNumber(Math.round(GameScene.TILE_SIZE/ 10), Math.round(GameScene.TILE_SIZE/3));
            let xPosition = this.trueRandom.randomNumber(player.x, player.x + player.width);
            let yPosition = this.trueRandom.randomNumber(player.y, player.y + player.height);

            SceneEngine.getInstance().injectGameObject(new ChaserAnimation({
                x: xPosition,
                y: yPosition,
                width: size,
                height: size
            }, this.behaviorHandler.boss));
        }



    }
}