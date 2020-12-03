import Scene from "../../../module/context/core/scene/scene";
import MapCreator from "../../handlers/mapCreator";
import Tile from "../model/tiles/tile";
import Global from "../../../module/context/generals/global";
import puzzleHandler from "../../handlers/puzzleHandler";
import PuzzleHandler from "../../handlers/puzzleHandler";

export default class PlayScene extends Scene{
    puzzleHandler: PuzzleHandler;

    maps: Tile[][];
    firstTarget: Tile = null;
    TILE_SIZE = 40;

    onCreated(): void {
        this.puzzleHandler = new PuzzleHandler();
        let mapCreator: MapCreator= new MapCreator(10,10);
        this.maps = mapCreator.getMapRandomized(this.TILE_SIZE);
        mapCreator.print(this.maps);
        for (let i = 0; i < this.maps.length; i++)
        {
            for (let j = 0; j < this.maps[i].length; j++)
            {
                this.addGameObject(this.maps[i][j]);
            }
        }
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        if(this.firstTarget !== null){
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.3;
            ctx.fillRect(this.firstTarget.x, this.firstTarget.y, this.firstTarget.width, this.firstTarget.height);
            ctx.globalAlpha = 1;
        }
    }

    onUpdate(): void {
    }

    mouseClick(e: MouseEvent) {
        let y = Math.floor(e.y / this.TILE_SIZE);
        let x = Math.floor(e.x /this.TILE_SIZE);

        let currentTile = this.maps[x][y];
        if(currentTile.point == 0)return;
        if(this.firstTarget === null){
            this.firstTarget = currentTile;
        }else{
            if(this.firstTarget === currentTile){
                this.firstTarget = null;
            }else{
                let temp = this.firstTarget.point;
                this.firstTarget.point = currentTile.point;
                currentTile.point = temp;
                this.puzzleHandler.checkOn(this.maps,this.firstTarget );
                this.puzzleHandler.checkOn(this.maps,currentTile);

                // console.log(this.firstTarget.xMap)
                this.firstTarget = null;

            }

        }

    }





}