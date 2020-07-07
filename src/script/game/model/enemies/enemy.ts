import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import Tile from "../tiles/tile";
import GameScene from "../../scenes/gameScene";

export default abstract class Enemy extends AnimateGameObject{
    private _hp: number;
    private _maxHp: number;
    velX: number = 0;
    velY: number = 0;

    tileX: number;
    tileY: number;

    get maxHp(): number {
        return this._maxHp;
    }

    set maxHp(value: number) {
        this._maxHp = value;
    }

    constructor(iGameObject: IRectangle, image: ImageBitmap= null) {
        super(iGameObject, image);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);

        let sideSize = 3;
        let barWidth = this.width-sideSize;
        let remainHPWidth = this.hp/this.maxHp * barWidth;

        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y+this.height, this.width, 8);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x+sideSize/2, this.y+this.height+sideSize/2, barWidth, 8-sideSize);
    }

    update(): void {
        super.update();
        this.x+=this.velX;
        this.y+=this.velY;


    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

    public pathFind(maps: Tile[][], fromY: number, fromX: number){
        let queue: Tile[] = [];

        for (let i = 0; i < maps.length; i++) {
            for (let j = 0; j < maps[i].length; j++) {
                maps[i][j].init();
            }
        }

        let start: Tile = maps[fromY][fromX];

        start.totalWeight = 0;

        let end: Tile = maps[this.x/GameScene.TILE_SIZE][this.y/GameScene.TILE_SIZE];
        queue.push(start);

        while(queue.length > 0 && end.parentX == -1){
            queue.sort((a:Tile, b: Tile)=>{
               return a.totalWeight - b.totalWeight;
            });

            let curr: Tile = queue.shift();
            if(curr.baseWeight == Tile.WALL)continue;
            curr.isOpen = true;


            if(!maps[curr.x][curr.y+1].isOpen){
                let currWeight = curr.totalWeight + maps[curr.x][curr.y+1].baseWeight;
                if(currWeight <= maps[curr.x][curr.y+1].totalWeight){
                    maps[curr.x][curr.y+1].totalWeight = currWeight;
                    maps[curr.x][curr.y+1].parentX = curr.x;
                    maps[curr.x][curr.y+1].parentY = curr.y;
                    queue.push(maps[curr.x][curr.y+1]);
                    maps[curr.x][curr.y+1].isOpen = true;
                }
                if(!maps[curr.x-1][curr.y].isOpen ){
                    let currWeight = curr.totalWeight + maps[curr.x-1][curr.y].baseWeight;
                    if(currWeight <= maps[curr.x-1][curr.y].totalWeight){
                        maps[curr.x-1][curr.y].totalWeight = currWeight;
                        maps[curr.x-1][curr.y].parentX = curr.x;
                        maps[curr.x-1][curr.y].parentY = curr.y;
                        queue.push(maps[curr.x-1][curr.y]);
                        maps[curr.x-1][curr.y].isOpen = true;
                    }
                }

                if(  !maps[curr.x+1][curr.y].isOpen  ){
                    let currWeight = curr.totalWeight + maps[curr.x+1][curr.y].baseWeight;
                    if(currWeight <= maps[curr.x+1][curr.y].totalWeight){
                        maps[curr.x+1][curr.y].totalWeight = currWeight;
                        maps[curr.x+1][curr.y].parentX = curr.x;
                        maps[curr.x+1][curr.y].parentY = curr.y;
                        queue.push(maps[curr.x+1][curr.y]);
                        maps[curr.x+1][curr.y].isOpen = true;
                    }
                }

                if(!maps[curr.x][curr.y-1].isOpen ){
                    let currWeight = curr.totalWeight + maps[curr.x][curr.y-1].baseWeight;
                    if(currWeight <= maps[curr.x][curr.y-1].totalWeight){
                        maps[curr.x][curr.y-1].totalWeight = currWeight;
                        maps[curr.x][curr.y-1].parentX = curr.x;
                        maps[curr.x][curr.y-1].parentY = curr.y;
                        queue.push(maps[curr.x][curr.y-1]);
                        maps[curr.x][curr.y-1].isOpen = true;
                    }
                }
            }
            let targetX = -1;
            let targetY = -1;

            if(end.parentY != -1){

                targetX = end.parentX * GameScene.TILE_SIZE;
                targetY = end.parentY * GameScene.TILE_SIZE;
                if(this.x < targetX){
                    this.velX = 1;
                }else if(this.x > targetX){
                    this.velX = -1;
                }

                if(this.y < targetY){
                    this.velY = 1;
                }else if(this.y > targetY){
                    this.velY = -1;
                }

            }else{
                console.log("path not found");
            }


        }



    }

}

