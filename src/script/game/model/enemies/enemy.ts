import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import Tile from "../tiles/tile";
import GameScene from "../../scenes/gameScene";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";

export default abstract class Enemy extends AnimateGameObject{
    private _hp: number;
    private _maxHp: number;
    velX: number = 0;
    velY: number = 0;

    movementSpeed: number;
    damagedHP: number;

    get maxHp(): number {
        return this._maxHp;
    }

    set maxHp(value: number) {
        this._maxHp = value;
    }

    protected constructor(iGameObject: IRectangle, image: ImageBitmap= null) {
        super(iGameObject, image);
        this.movementSpeed = 1;
        this.damagedHP = 0;
        this.setZIndex(15);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);

        let sideSize = 3;
        let barWidth = this.width-sideSize;
        let remainHPWidth = this.hp/this.maxHp * barWidth;
        let damagedHPWidth = this.damagedHP/this.maxHp * barWidth;

        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y+this.height, this.width, 8);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x+sideSize/2, this.y+this.height+sideSize/2, remainHPWidth, 8-sideSize);
        ctx.fillStyle = "red";
        ctx.fillRect( this.x+sideSize/2 + remainHPWidth, this.y+this.height+sideSize/2, damagedHPWidth, 8-sideSize);

        if(this.damagedHP> 0){
            this.damagedHP -= 1.5;
            if(this.damagedHP < 0)this.damagedHP = 0;
        }
    }

    update(): void {
        super.update();
        this.x+=this.velX * this.movementSpeed;
        this.y+=this.velY * this.movementSpeed;
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

    public initHP(hp: number){
        this.maxHp = hp;
        this.hp = hp;
    }

    public reduceHP(value: number){
        this.hp -= value;
        this.damagedHP += value;
        this.setZIndex(this.zIndex+1);
        SceneEngine.getInstance().reorderZIndex();
        if(this.hp <= 0){
            this.hp = 0;
            this.destroy();
        }
    }

    isWalkAble(tile: Tile){
        return tile.baseWeight != Tile.WALL && tile.baseWeight != Tile.GRASS;
    }

    public pathFind(maps: Tile[][], fromY: number, fromX: number){
        let queue: Tile[] = [];

        for (let i = 1; i < maps.length-1; i++) {
            for (let j = 1; j < maps[i].length-1; j++) {
                maps[i][j].init();
            }
        }

        let start: Tile = maps[fromY][fromX];

        start.totalWeight = 0;

        let end: Tile = maps[Math.round(this.x/GameScene.TILE_SIZE)][Math.round(this.y/GameScene.TILE_SIZE)];

        queue.push(start);
        while(queue.length > 0 && end.parentX == -1){
            queue.sort((a:Tile, b: Tile)=>{
               return a.totalWeight - b.totalWeight;
            });

            let curr: Tile = queue.shift();

            if(!maps[curr.x][curr.y+1].isOpen && this.isWalkAble(maps[curr.x][curr.y+1])) {
                let currWeight = curr.totalWeight + maps[curr.x][curr.y + 1].baseWeight;
                if (currWeight <= maps[curr.x][curr.y + 1].totalWeight) {
                    maps[curr.x][curr.y + 1].totalWeight = currWeight;
                    maps[curr.x][curr.y + 1].parentX = curr.x;
                    maps[curr.x][curr.y + 1].parentY = curr.y;
                    queue.push(maps[curr.x][curr.y + 1]);
                    maps[curr.x][curr.y + 1].isOpen = true;
                }
            }
            if(!maps[curr.x-1][curr.y].isOpen && this.isWalkAble(maps[curr.x-1][curr.y])){
                let currWeight = curr.totalWeight + maps[curr.x-1][curr.y].baseWeight;
                if(currWeight <= maps[curr.x-1][curr.y].totalWeight){
                    maps[curr.x-1][curr.y].totalWeight = currWeight;
                    maps[curr.x-1][curr.y].parentX = curr.x;
                    maps[curr.x-1][curr.y].parentY = curr.y;
                    queue.push(maps[curr.x-1][curr.y]);
                    maps[curr.x-1][curr.y].isOpen = true;
                }
            }

            if(  !maps[curr.x+1][curr.y].isOpen  && this.isWalkAble(maps[curr.x+1][curr.y])){
                let currWeight = curr.totalWeight + maps[curr.x+1][curr.y].baseWeight;
                if(currWeight <= maps[curr.x+1][curr.y].totalWeight){
                    maps[curr.x+1][curr.y].totalWeight = currWeight;
                    maps[curr.x+1][curr.y].parentX = curr.x;
                    maps[curr.x+1][curr.y].parentY = curr.y;
                    queue.push(maps[curr.x+1][curr.y]);
                    maps[curr.x+1][curr.y].isOpen = true;
                }
            }

            if(!maps[curr.x][curr.y-1].isOpen && this.isWalkAble(maps[curr.x][curr.y-1])){
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
            }else{
                this.velX = 0;
            }

            if(this.y < targetY){
                this.velY = 1;
            }else if(this.y > targetY){
                this.velY = -1;
            }else{
                this.velY = 0;
            }
        }else{
            console.log("path not found");
        }

    }

}

