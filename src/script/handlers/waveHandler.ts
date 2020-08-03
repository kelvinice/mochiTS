import Enemy from "../game/model/enemies/enemy";
import GameScene from "../game/scenes/gameScene";
import TimeCounter from "./timeCounter";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import Boss from "../game/model/enemies/boss";
import Player from "../game/model/player";
import PerkHandler from "./perkHandler";

export default class WaveHandler {
    timeForEachWave: number = 7000;

    enemies: Enemy[];
    private waveOnGoing: boolean;
    waveNum: number;


    private waveTimeCounter: TimeCounter;
    private bossWave: number;
    private player: Player;


    constructor(enemies: Enemy[], player: Player) {
        this.enemies = enemies;
        this.waveTimeCounter = new TimeCounter(this.timeForEachWave);
        this.waveNum = 0;
        this.bossWave = 2;
        this.player = player;
        this.waveOnGoing = false;
        GameScene.spawnHandler.setWillSpawn(false);
        // GameScene.spawnHandler.
    }

    update(){
        if(this.waveNum <= this.bossWave && this.waveTimeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
            this.waveOnGoing = false;
            GameScene.spawnHandler.setWillSpawn(false);
        }

    }


    startWave(){
        if(this.waveNum == this.bossWave){
            let boss = new Boss({
                x: 100,
                y: 100,
                width: GameScene.TILE_SIZE*2,
                height: GameScene.TILE_SIZE*2,
            }, this.player);
            boss.blink();
            SceneEngine.getInstance().injectGameObject(boss);
            this.enemies.push(boss);
            this.waveNum++;
        }else if(this.waveNum < this.bossWave){
            GameScene.spawnHandler.changeAllSpawner(this.waveNum);
            GameScene.spawnHandler.setWillSpawn(true);
            this.waveTimeCounter.resetCounter();
            this.waveNum++;
            this.waveOnGoing = true;
        }
    }

    notifiedEnemyDead(){
        if(this.enemies.length == 0 && this.waveOnGoing == false){
            PerkHandler.getInstance().addPerkToChoose();
        }

    }

    choosePerk(){
        this.startWave();
    }



    
}