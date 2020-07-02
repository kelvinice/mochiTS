import TrueRandom from './trueRandom';
import Tile from '../game/model/tile';

// class Coord
// {
    // public x: Number;
    // y: Number;
    // public xfrom: Number;
    //  yfrom: Number;
    // public prior: Number;
    // public Coord(y: Number, x: Number, yfrom: Number, xfrom: Number, prior: Number)
    // {
    //     this.prior = prior;
    //     this.y = y;
    //     this.x = x;
    //     this.yfrom = yfrom;
    //     this.xfrom = xfrom;
    // }
// };


class Point{
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    };
}

export default class MapCreator{
    HEIGHT: number = 20;
    WIDTH: number = 20;
    MIN_HEIGHT = 3;
    MIN_WIDTH = 3;
    MAX_HEIGHT = 10;
    MAX_WIDTH = 10;
    map: Tile[][];
    queue : Point[];
    trueRandom: TrueRandom;
    lastOpen: Tile;

    constructor(WIDTH: number, HEIGHT: number){
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
        this.init();
        
        let res = this.getMapFromBSP();
        
        this.reconstructWall(res);

        this.createHomeAndSpawner(res);
        // this.print(res);
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
                temp= temp + map[i][j].getChar();
            }
            console.log(i+" "+temp);
        }

    }

    recursiveSearch(){
        let curr: Point = this.queue.shift();
        
        this.lastOpen = this.map[curr.x][curr.y];

        if(this.map[curr.x-1][curr.y].poin > 0){
            this.map[curr.x-1][curr.y].poin = 0;
            this.queue.push(new Point(curr.x-1,curr.y));
        }
        if(this.map[curr.x+1][curr.y].poin > 0){
            this.map[curr.x+1][curr.y].poin = 0;
            this.queue.push(new Point(curr.x+1,curr.y));
        }
        if(this.map[curr.x][curr.y-1].poin > 0){
            this.map[curr.x][curr.y-1].poin = 0;
            this.queue.push(new Point(curr.x,curr.y-1));
        }
        if(this.map[curr.x][curr.y+1].poin > 0){
            this.map[curr.x][curr.y+1].poin = 0;
            this.queue.push(new Point(curr.x,curr.y+1));
        }
    }

    createHomeAndSpawner(map: Tile[][]) {
        this.queue = [];
        for (let i = 1; i < this.HEIGHT-1; i++)
        {
            for (let j = 1; j < this.WIDTH-1; j++)
            {
                if ((i == 1 || j == 1 || i == this.HEIGHT - 2 || j == this.WIDTH - 2) && map[i][j].char == "#"){
                    map[i][j] = new Tile('S');
                    this.queue.push(
                        new Point(i,j)
                        );
                }
            }
        }
        
        while(this.queue.length > 0)this.recursiveSearch();
        this.lastOpen.setChar("H");
    }

    
    reconstructWall(map: Tile[][])
    {
        for (let i = 0; i < this.HEIGHT; i++)
        {
            for (let j = 0; j < this.WIDTH; j++)
            {
                if (i == 0 || j == 0 || i == this.HEIGHT - 1 || j == this.WIDTH - 1) map[i][j] = new Tile('W');
            }
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
                if (i == 0 || j == 0 || i == this.HEIGHT - 1 || j == this.WIDTH - 1) this.map[i][j] = new Tile('#');
                else this.map[i][j] = new Tile(' ');
            }
        }
    }

    randomNumber(min: number, max: number): number
    {
        return Math.floor(this.trueRandom.random() * (max - min) + min);
    }

    drawBSP(minY: number, minX : number, maxY : number, maxX : number)
    {
        for (let i = minY; i <= maxY; i++)
        {
            for (let j = minX; j <= maxX; j++)
            {
                if (i == minY || j == minX || i == maxY || j == maxX) this.map[i][j].setChar('#');
            }
        }
    }

     BSP(minY : number,  minX : number,  maxY : number, maxX : number)
    {
        let lengthY: number  = maxY - minY + 1;
        let lengthX: number  = maxX - minX + 1;

        this.drawBSP(minY, minX, maxY, maxX);

        if (lengthY >= lengthX)
        {
            if (lengthY < this.MAX_HEIGHT)
            {
                return;
            }
            let mid : number = this.randomNumber(minY + this.MIN_HEIGHT, maxY - this.MIN_WIDTH);
            this.BSP(minY, minX, mid, maxX);
            this.BSP(mid, minX, maxY, maxX);
            
        }
        else
        {
            if (lengthX < this.MAX_WIDTH)
            {
                return;
            }
            let mid: number = this.randomNumber(minX + this.MIN_HEIGHT, maxX - this.MIN_WIDTH);
            this.BSP(minY, mid, maxY, maxX);
            this.BSP(minY, minX, maxY, mid);
            
        }

    }

    getMapFromBSP() : Tile[][]
    {
        this.init();
        this.BSP(0, 0, this.HEIGHT - 1, this.WIDTH - 1);
        return this.map;
    }

    init2()
    {
        for (let i = 0; i < this.HEIGHT; i++)
        {
            for (let j = 0; j < this.WIDTH; j++)
            {
                this.map[i][j].setChar('#');
            }
        }
    }



}