import Scene from "../../../module/context/core/scene/scene";
import MapCreator from "../../handlers/mapCreator";
import Tile from "../model/tiles/tile";
import PuzzleHandler from "../../handlers/puzzleHandler";
import GameObject from "../../../module/context/core/gameObjects/gameObject";
import GameObjectMovementActivity from "../../general/GameObjectMovementActivity";
import MultipleActivities from "../../../module/context/core/activities/multipleActivities";
import Point from "../model/point";
import Global from "../../../module/context/generals/global";
import HitEffect from "../model/hitEffect";
import BackTile from "../model/tiles/backTile";
import SoundPlayer from "../../handlers/soundPlayer";
import soundPlayer from "../../handlers/soundPlayer";

export default class PlayScene extends Scene{
    puzzleHandler: PuzzleHandler;

    maps: Tile[][];
    firstTarget: Tile = null;
    TILE_SIZE = 40;
    substituteCount: number = -1;
    soundPlayer: SoundPlayer;

    calculate(){
        this.TILE_SIZE = Math.min(Global.getInstance().width, Global.getInstance().height)/10;

        let vCount = 10;
        let hCount = 10;

        if(Global.getInstance().width > Global.getInstance().height){
            hCount = Math.round(Global.getInstance().width/this.TILE_SIZE);
        }else{
            vCount = Math.round(Global.getInstance().height/this.TILE_SIZE);
        }
        let mapCreator: MapCreator= new MapCreator(vCount,hCount);

        this.maps = mapCreator.getMapRandomized(this.TILE_SIZE);
        for (let i = 0; i < this.maps.length; i++)
        {
            for (let j = 0; j < this.maps[i].length; j++)
            {
                this.addGameObject(new BackTile(this.maps[i][j], this.maps[i][j].point));
                this.addGameObject(this.maps[i][j]);
            }
        }
    }

    onCreated(): void {
        this.puzzleHandler = new PuzzleHandler();
        this.soundPlayer = new SoundPlayer();
        this.calculate();

        // this.checkAll();
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
        if(this.substituteCount <= -1 && this.activities.length === 0){
            this.checkAll();
        }
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
            let xDif = this.firstTarget.xMap - currentTile.xMap;
            let yDif = this.firstTarget.yMap - currentTile.yMap;
            if(Math.abs(xDif) + Math.abs(yDif) > 1){
                return;
            }
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
                    let changingList = this.puzzleHandler.checkOn(this.maps,this.firstTarget);
                    for (let point of this.puzzleHandler.checkOn(this.maps, currentTile)) {
                        changingList = puzzleHandler.getBottomChangingPointList(changingList, point);
                    }

                    if(changingList.length === 0){ //Change Back
                        let multipleActivities = new MultipleActivities();
                        multipleActivities.addActivity(mov1);
                        multipleActivities.addActivity(mov2);
                        multipleActivities.then(()=>{
                            let temp = firstTarget.point;
                            firstTarget.point = currentTile.point;
                            currentTile.point = temp;
                            puzzleHandler.swapTilePosition(firstTarget, currentTile);
                        });
                        this.addActivity(multipleActivities);
                    }else{
                        this.soundPlayer.playRandomHitSound();

                        for (let point of changingList) {
                            this.getSubstitute(point.x, point.y);
                        }
                        
                    }
                    this.substituteCount = -1;
                    this.firstTarget = null;
                }.bind(this));

                this.addActivity(multipleActivities);

            }
        }
    }

    getSubstitute(xMap: number, yMap: number, level: number = 0, then: Function = null){
        let isCreatedNew: boolean = false;
        this.substituteCount++;
        let currY = yMap;
        let currTile: Tile;
        currY--;
        while((this.maps[xMap][currY] == null || this.maps[xMap][currY].isDestroyed)){
            currY--;
            if(currY == 0)break;
        }
        if(this.maps[xMap][currY] != null && !this.maps[xMap][currY].isDestroyed && this.maps[xMap][currY].point > 0){
            currTile = this.maps[xMap][currY];
        }else{
            currTile = this.puzzleHandler.createNewTile(this.TILE_SIZE, 0 - level, xMap, 3);
            this.addGameObject(currTile);
            isCreatedNew = true;
        }
        if(!isCreatedNew && this.maps[xMap][currY].point > 0){
            this.maps[xMap][currY] = null;
        }

        currTile.xMap = xMap;
        currTile.yMap = yMap;

        this.maps[xMap][yMap] = currTile;

        let mov1 = new GameObjectMovementActivity(currTile, new Point(xMap * this.TILE_SIZE, yMap * this.TILE_SIZE), this.TILE_SIZE * 3);
        let multipleActivities = new MultipleActivities();
        multipleActivities.addActivity(mov1);
        multipleActivities.then(()=>{
            this.substituteCount--;
        });
        if(this.maps[xMap][yMap-1] == null || this.maps[xMap][yMap-1].isDestroyed){
            this.maps[xMap][yMap-1] = null;
            level += (isCreatedNew) ? 1: 0;

            this.getSubstitute(xMap, yMap-1, level, then);
        }else{
            if(then != null){
                then();
            }
        }
        this.addActivity(multipleActivities);
    }
    
    checkAll(){
        this.substituteCount = -1;
        let changingList: Point[] = [];
        let isChanged: boolean = false;
        for (let i = 1; i < MapCreator.HEIGHT-1; i++)
        {
            for (let j = 1; j < MapCreator.WIDTH-1; j++)
            {
                let nextChangingList = this.puzzleHandler.checkOn(this.maps, this.maps[i][j]);
                for (let point of nextChangingList) {
                    changingList = this.puzzleHandler.getBottomChangingPointList(changingList, point);
                }

            }
        }

        for (let point of changingList) {
            isChanged = true;
            this.getSubstitute(point.x, point.y);
        }
        if(isChanged == false){
            this.substituteCount = 0;
            // console.log("clear");
        }else{
            this.soundPlayer.playRandomHitSound();
        }

    }


    noticeDelete(gameObject: GameObject) {
        super.noticeDelete(gameObject);
        if(gameObject instanceof Tile){
            this.addGameObject(new HitEffect(gameObject));
        }

    }


}