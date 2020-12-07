import Scene from "../../../module/context/core/scene/scene";
import MapCreator from "../../handlers/mapCreator";
import Tile from "../model/tiles/tile";
import Global from "../../../module/context/generals/global";
import puzzleHandler from "../../handlers/puzzleHandler";
import PuzzleHandler from "../../handlers/puzzleHandler";
import GameObject from "../../../module/context/core/gameObjects/gameObject";
import GameObjectMovementActivity from "../../general/GameObjectMovementActivity";
import MultipleActivities from "../../../module/context/core/activities/multipleActivities";
import Point from "../model/point";

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
        if(this.activities.length > 0)return;

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
                let mov1 = new GameObjectMovementActivity(this.firstTarget, new Point(currentTile.x, currentTile.y), this.TILE_SIZE * 3);
                let mov2 = new GameObjectMovementActivity(currentTile, new Point(this.firstTarget.x, this.firstTarget.y), this.TILE_SIZE * 3);
                let multipleActivities = new MultipleActivities();
                multipleActivities.addActivity(mov1);
                multipleActivities.addActivity(mov2);

                multipleActivities.then(function () {
                    let puzzleHandler = this.puzzleHandler;
                    let firstTarget = this.firstTarget;
                    let temp = firstTarget.point;
                    firstTarget.point = currentTile.point;
                    currentTile.point = temp;
                    this.puzzleHandler.swapTilePosition(firstTarget, currentTile);
                    let unchanged1: boolean = !this.puzzleHandler.checkOn(this.maps,this.firstTarget)
                    let unchanged2: boolean = !this.puzzleHandler.checkOn(this.maps,currentTile);

                    if(unchanged1 && unchanged2){
                        let multipleActivities = new MultipleActivities();
                        multipleActivities.addActivity(mov1);
                        multipleActivities.addActivity(mov2);
                        multipleActivities.then(function () {
                            let temp = firstTarget.point;
                            firstTarget.point = currentTile.point;
                            currentTile.point = temp;
                            puzzleHandler.swapTilePosition(firstTarget, currentTile);
                        }.bind(firstTarget, currentTile, puzzleHandler));
                        this.addActivity(multipleActivities);
                    }

                    this.firstTarget = null;
                }.bind(this));

                this.addActivity(multipleActivities);

            }

        }

    }

    noticeDelete(gameObject: GameObject) {
        super.noticeDelete(gameObject);
        // this.addGameObject(gameObject);
        



    }


}