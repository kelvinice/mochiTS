export default class Tile{
    static readonly WALL: number = 99999;
    static readonly PATH: number = 1;
    static readonly SPAWNER: number = 10;
    static readonly GRASS: number = 9999;

    char: String;
    point: number;

    x: number;
    y: number;

    parentX: number;
    parentY: number;

    totalWeight: number;
    baseWeight: number;
    isOpen: boolean;

    // modifierWeight: number;



    init(): void{
        this.totalWeight = 99999;
        this.parentX = -1;
        this.parentY = -1;
        this.isOpen = false;
    }

    constructor(char: String, y: number, x: number){
        this.init();
        this.setChar(char);
        this.x = x;
        this.y = y;
    }

    setChar(char: String){
        this.char = char;
        if(char=="#" || char== "S")this.point = 1;
        else this.point = 0;

        if(char === "#" || char === "H"){
            this.baseWeight = Tile.PATH;
        }else if(char === "S"){
            this.baseWeight = Tile.SPAWNER;
        }else if(char === " "){
            this.baseWeight = Tile.GRASS;
        }else if(char === "W"){
            this.baseWeight = Tile.WALL;
        }
    }

    getChar() : String{
        return this.char;
    }


}