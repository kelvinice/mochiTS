import Spawner from "../game/model/enemies/spawner";
import Enemy from "../game/model/enemies/enemy";
import TrueRandom from "./trueRandom";

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


    
}