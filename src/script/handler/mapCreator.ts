import TrueRandom from './trueRandom';
class Coord
{
    public x: Number;
    y: Number;
    public xfrom: Number;
     yfrom: Number;
    public prior: Number;
    public Coord(y: Number, x: Number, yfrom: Number, xfrom: Number, prior: Number)
    {
        this.prior = prior;
        this.y = y;
        this.x = x;
        this.yfrom = yfrom;
        this.xfrom = xfrom;
    }
};

export default class MapCreator{
    constructor(x: number, y: number){
        this.init();
        console.log(this.getMapFromBSP());
    }

    HEIGHT: number = 20;
    WIDTH: number = 20;
    MIN_HEIGHT = 3;
    MIN_WIDTH = 3;
    MAX_HEIGHT = 11;
    MAX_WIDTH = 11;

    map: String[][];
    trueRandom: TrueRandom = new TrueRandom(Math.floor(Math.random() * (10000)));

    init()
    {
        this.map = [];

        for (var i = 0; i < this.HEIGHT; i++)
        {
            this.map[i] = [];
            for (var j = 0; j < this.WIDTH; j++)
            {
                this.map[i][j] = "";
                if (i == 0 || j == 0 || i == this.HEIGHT - 1 || j == this.WIDTH - 1) this.map[i][j] = '#';
                else this.map[i][j] = ' ';
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
                if (i == minY || j == minX || i == maxY || j == maxX) this.map[i][j] = '#';
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

    getMapFromBSP() : String[][]
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
                this.map[i][j] = '#';
            }
        }
    }



}