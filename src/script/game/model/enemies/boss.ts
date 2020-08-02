import Enemy from "./enemy";
import Tile from "../tiles/tile";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";
import Global from "../../../../module/context/generals/global";
import Player from "../player";
import TrueRandom from "../../../handlers/trueRandom";
import GameScene from "../../scenes/gameScene";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";
import bossBehaviorHandler from "../../../handlers/bossBehaviorHandler";
import BossBehaviorHandler from "../../../handlers/bossBehaviorHandler";
import Point from "../point";
import TimeCounter from "../../../handlers/timeCounter";

export default class Boss extends Enemy{
    player: Player;
    private trueRandom: TrueRandom;
    private bossBehaviorHandler: bossBehaviorHandler;
    shadows: Point[] = [];
    shadowTimer: TimeCounter;


    constructor(iGameObject: IRectangle, player: Player) {
        super(iGameObject, Global.getInstance().assetManager.loadedImage["boss"]);

        this.rectangles = splitSprite(this.image, 5, 2);
        this.animationController.addAnimation("right", 0, 4, 200);
        this.animationController.addAnimation("left", 5, 9, 200);

        this.animationController.setAnim("right");
        this.movementSpeed = 0;
        this.initHP(1000);
        this.player = player;
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
        this.bossBehaviorHandler = new BossBehaviorHandler(this);
        this.shadowTimer = new TimeCounter(50);

    }


    update() {
        super.update();
        if(this.player.getMiddlePoint().x > this.getMiddlePoint().x){
            this.animationController.setAnim("right");
        }else if(this.player.getMiddlePoint().x < this.getMiddlePoint().x){
            this.animationController.setAnim("left");
        }

        this.bossBehaviorHandler.update();


    }


    pathFind(maps: Tile[][], fromY: number, fromX: number) {
        return;
    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        if(this.shadowTimer.updateTimeByCurrentTimeMili(time.valueOf())){
            this.shadows.shift();
        }
        let shadows = [...this.shadows];
        let shadowCount = shadows.length;
        let i =0;
        for (const shadow of this.shadows) {
            ctx.globalAlpha = 1/shadowCount * i + 0.1;
            this.drawAnimationOnXY(ctx, shadow.x,shadow.y);
            i++;
        }
        ctx.globalAlpha = 1;
        super.draw(ctx, time);
    }


    onHitWithPlayer() {
        //blink away
        this.blink();
    }

    blink(){
        let nextX = 0;
        let nextY = 0;
        do{
            nextX = this.trueRandom.randomNumber( GameScene.TILE_SIZE + this.width, SceneEngine.getInstance().canvas.width - (GameScene.TILE_SIZE + this.width));
            nextY = this.trueRandom.randomNumber( GameScene.TILE_SIZE + this.height, SceneEngine.getInstance().canvas.height - (GameScene.TILE_SIZE + this.height));

        }while(this.player.isIntersectSoft({
            x:nextX,
            y:nextY,
            width: this.width,
            height: this.height
        }));


        let xDis = Math.abs(nextX - this.x);
        let yDis = Math.abs(nextY - this.y);

        let totalDistance = xDis + yDis;
        let shadowPerPx = 50;

        let xMult = 1;
        let yMult = 1;
        if(nextX < this.x)xMult = -1;
        if(nextY < this.y)yMult = -1;

        let shadowCount = totalDistance / shadowPerPx;

        for (let i = 0; i < shadowCount ; i++) {
            this.shadows.push(new Point(
                this.x + (xMult * xDis/shadowCount * i),
                this.y + (yMult * yDis/shadowCount * i)
            ));
        }

        this.shadowTimer.targetTime = 250/shadowCount;
        this.shadowTimer.counter = 0;
        this.x = nextX;
        this.y = nextY;
    }




}