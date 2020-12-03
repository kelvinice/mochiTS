import TrueRandom from './trueRandom';
import Tile from '../game/model/tiles/tile';

export default class MapCreator{
    HEIGHT: number = 20;
    WIDTH: number = 20;
    map: Tile[][];
    trueRandom: TrueRandom;

    constructor(WIDTH: number, HEIGHT: number){
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
        this.init();

    }

    getMap(): Tile[][]{
        return this.map;
    }

    print(map: Tile[][]){
        for (let i = 0; i < this.HEIGHT; i++)
        {
            let temp: string = "";
            for (let j = 0; j < this.WIDTH; j++)
            {
                temp= temp + map[i][j].point;
            }
            console.log(i+" "+temp);
        }

    }


    init()
    {
        this.map = [];

        for (let i = 0; i < this.HEIGHT; i++)
        {
            this.map[i] = [];
            for (let j = 0; j < this.WIDTH; j++)
            {
                if (i == 0 || j == 0 || i == this.HEIGHT - 1 || j == this.WIDTH - 1) this.map[i][j] = new Tile(0, j, i, 20);
                else this.map[i][j] = new Tile(0, j, i, 20);
            }
        }
    }


    getMapRandomized(): Tile[][]
    {
        this.init();
        for (let i = 0; i < this.HEIGHT; i++)
        {
            this.map[i] = [];
            for (let j = 0; j < this.WIDTH; j++)
            {
                if (i == 0 || j == 0 || i == this.HEIGHT - 1 || j == this.WIDTH - 1) this.map[i][j] = new Tile(0, j, i, 20);
                else this.map[i][j] = new Tile(this.trueRandom.randomNumber(1,3), j, i,20);
            }
        }

        return this.map;
    }

}