import TrueRandom from './trueRandom';
import Tile from '../game/model/tiles/tile';
import Global from "../../module/context/generals/global";

export default class MapCreator{
    static HEIGHT: number = 20;
    static WIDTH: number = 20;
    map: Tile[][];
    trueRandom: TrueRandom;

    constructor(WIDTH: number, HEIGHT: number){
        MapCreator.WIDTH = WIDTH;
        MapCreator.HEIGHT = HEIGHT;
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
        this.init();

    }

    getMap(): Tile[][]{
        return this.map;
    }

    print(map: Tile[][]){
        for (let i = 0; i < MapCreator.HEIGHT; i++)
        {
            let temp: string = "";
            for (let j = 0; j < MapCreator.WIDTH; j++)
            {
                temp= temp + map[i][j].point;
            }
            console.log(i+" "+temp);
        }

    }


    init()
    {
        this.map = [];

        for (let i = 0; i < MapCreator.HEIGHT; i++)
        {
            this.map[i] = [];
            for (let j = 0; j < MapCreator.WIDTH; j++)
            {
                if (i == 0 || j == 0 || i == MapCreator.HEIGHT - 1 || j == MapCreator.WIDTH - 1) this.map[i][j] = new Tile(0, j, i, 20);
                else this.map[i][j] = new Tile(0, j, i, 20);
            }
        }
    }


    getMapRandomized(size: number): Tile[][]
    {
        this.init();

        for (let i = 0; i < MapCreator.HEIGHT; i++)
        {
            this.map[i] = [];
            for (let j = 0; j < MapCreator.WIDTH; j++)
            {
                if (i == 0 || j == 0 || i == MapCreator.HEIGHT - 1 || j == MapCreator.WIDTH - 1) {
                    this.map[i][j] = new Tile(0, j, i, size);
                    this.map[i][j].setZIndex(100);
                }

                else this.map[i][j] = new Tile(this.trueRandom.randomNumber(1,Global.getInstance().maxTileCount), j, i,size);
            }
        }

        return this.map;
    }

}