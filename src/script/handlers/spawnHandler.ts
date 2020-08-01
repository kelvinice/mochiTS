import Spawner from "../game/model/enemies/spawner";
import Enemy from "../game/model/enemies/enemy";
import TrueRandom from "./trueRandom";
import SkeletonSpawner from "../game/model/enemies/skeletonSpawner";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import {IRectangle} from "../../module/context/core/gameObjects/gameObject";
import SlimeSpawner from "../game/model/enemies/slimeSpawner";

export default class SpawnHandler {
    spawners: Spawner[];
    currentValue: number;
    valueToSpawn: number;
    trueRandom: TrueRandom;

    constructor(spawners: Spawner[]) {
        this.spawners = spawners;
        this.currentValue = 0;
        this.valueToSpawn = 2; //in seconds
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }

    public update(value: number): Enemy{
        this.currentValue+=value;
        if(this.currentValue >= this.valueToSpawn){
            this.currentValue%=this.valueToSpawn;
            // this.currentValue=0;
            return this.spawn();
        }

        return null;
    }

    spawn(): Enemy{
        let num = Math.floor(this.trueRandom.randomNumber(0, this.spawners.length));
        return this.spawners[num].spawn();
    }

    getSpawnerByTypeNumber(type: number, iRectangle: IRectangle){
        if(type == 0){
            return new SlimeSpawner(iRectangle);
        }else {
            return new SkeletonSpawner(iRectangle);
        }
    }

    changeSpawner(spawner: Spawner, type: number){
        let previousSpawner = spawner;
        let newSpawner = this.getSpawnerByTypeNumber(type,previousSpawner.getHitBox());
        newSpawner.setZIndex(previousSpawner.zIndex);

        SceneEngine.getInstance().injectGameObject(newSpawner);
        previousSpawner.destroy();

        this.spawners.splice(this.spawners.indexOf(previousSpawner) , 1);
        this.spawners.push(newSpawner);
    }

    changeAllSpawner(type: number = -1){
        let spawners = [...this.spawners];
        for (const spawner of spawners) {
            let num = this.trueRandom.randomNumber(0,2);
            if(type==-1){
                this.changeSpawner(spawner, num);
            }else{
                this.changeSpawner(spawner, type);
            }
        }
    }


    
}