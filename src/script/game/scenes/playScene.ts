import Scene from "../../../module/context/core/scene/scene";
import MapCreator from "../../handlers/mapCreator";
import Tile from "../model/tiles/tile";
import PuzzleHandler from "../../handlers/puzzleHandler";
import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/game-object";
import GameObjectMovementActivity from "../../general/GameObjectMovementActivity";
import MultipleActivities from "../../../module/context/core/activities/multiple-activities";
import Point from "../../../module/context/generals/point";
import Global from "../../../module/context/generals/global";
import HitEffect from "../model/hitEffect";
import BackTile from "../model/tiles/backTile";
import SoundPlayer from "../../handlers/soundPlayer";
import NumberHUD from "../model/huds/numberHUD";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import TimeCounter from "../../handlers/timeCounter";
import HealthHandler from "../../handlers/healthHandler";
import MenuScene from "./MenuScene";
import ScoreScene from "./ScoreScene";

export default class PlayScene extends Scene{
    puzzleHandler: PuzzleHandler;
    maps: Tile[][];
    firstTarget: Tile = null;
    TILE_SIZE = 40;
    substituteCount: number = -1;
    soundPlayer: SoundPlayer;
    numbers: NumberHUD[];
    score: number;
    flipCounter: TimeCounter;
    heartHandler: HealthHandler;
    hpCounter: number;

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
        this.heartHandler = new HealthHandler({x:this.TILE_SIZE * hCount,y:0, width:this.TILE_SIZE, height:this.TILE_SIZE});
        this.addGameObject(this.heartHandler);
    }

    onCreated(): void {
        this.puzzleHandler = new PuzzleHandler();
        this.soundPlayer = new SoundPlayer();
        this.calculate();
        this.score = 0;
        this.hpCounter = 0;
        this.numbers = [];
        for (let i = 0; i < 3; i++) {
            let number = new NumberHUD(<IRectangle>{
                x:(this.TILE_SIZE * i),
                y: 0,
                width: this.TILE_SIZE,
                height: this.TILE_SIZE
            });
            this.numbers[i] = number;
            number.setZIndex(200+1);
            SceneEngine.getInstance().injectGameObject(number);
        }
        this.flipCounter = new TimeCounter(1000/120);

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
        if(this.flipCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMilli())){
            Global.getInstance().flipNum++;
            if(Global.getInstance().flipNum > 110)Global.getInstance().flipNum = 0;
        }
        if(this.substituteCount <= -1 && this.activities.length === 0){
            this.checkAll();
        }
        if(this.substituteCount > -1 && this.activities.length === 0){
            if(this.heartHandler.maxHP <=0){
                // alert("Game Over, Score: "+this.score);
                SceneEngine.getInstance().updateScene(new ScoreScene(this.score));
            }
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

                        this.heartHandler.maxHP--;
                        this.heartHandler.getHeartNo(this.heartHandler.maxHP).setVisible(false);
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
        }else{
            this.soundPlayer.playRandomHitSound();
        }

    }

    noticeDelete(gameObject: GameObject) {
        super.noticeDelete(gameObject);
        if(gameObject instanceof Tile){
            this.addGameObject(new HitEffect(gameObject));
            this.score++;
            if(gameObject.point == 3 && gameObject.zIndex != 300){
                this.score++;

                this.hpCounter++;
                console.log(this.hpCounter)
                if(this.hpCounter >= 3){
                    if(this.heartHandler.maxHP <3){
                        console.log(this.TILE_SIZE)
                        console.log(gameObject.yMap)
                        let temp: GameObject = new Tile(3, gameObject.yMap , gameObject.xMap, gameObject.width);
                        console.log(temp);
                        this.addGameObject(temp.setZIndex(300));
                        let n =this.heartHandler.maxHP;
                        this.heartHandler.maxHP++;
                        this.hpCounter%=3;

                        console.log("Claim : "+this.hpCounter);

                        let mov1 = new GameObjectMovementActivity(temp, new Point(this.heartHandler.getHeartNo(n).x + 1, 0), this.TILE_SIZE * 10);
                        let multipleActivities = new MultipleActivities();
                        multipleActivities.addActivity(mov1);
                        multipleActivities.then(()=>{
                            this.heartHandler.getHeartNo(n).setVisible(true);
                            this.destroyGameObject(temp);
                        });
                        this.addActivity(multipleActivities);

                    }

                }

            }
            this.setScore(this.score);
        }
    }

    setScore(number: number){
        let pad = "";
        for (let i = 0; i < 3-1; i++) {
            pad+="0";
        }
        let score = (pad + number).slice(-1 * 3);
        this.score = number;
        for(let i=0;i<score.length;i++){
            this.numbers[i].setNumber(+score[i]);
        }
    }

}