import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";
import GameScene from "../../scenes/gameScene";
import global from "../../../../module/context/generals/global";
import {FrameListener} from "../../../../module/context/core/animations/animationController";
import Enemy from "../enemies/enemy";
import SceneEngine from "../../../../module/context/core/scene/sceneEngine";
import TextEffect from "../textEffect";
import Global from "../../../../module/context/generals/global";

export default class SunStrike extends AnimateGameObject implements FrameListener{
    public willDmg: boolean;
    public damage: number;

    constructor(iGameObject: IRectangle) {
        super(iGameObject, Global.getInstance().assetManager.loadedImage["sunStrike"]);
        this.setZIndex(30);

        this.rectangles = splitSprite(this.image, 5, 6);
        this.animationController.addAnimation("burn", 0, 29, 80);

        this.animationController.setAnim("burn");

        this.topPadding = GameScene.TILE_SIZE * 3;
        this.leftPadding = GameScene.TILE_SIZE*2;
        this.rightPadding = GameScene.TILE_SIZE*2;
        this.animationController.addFrameListener(this);
        this.willDmg = false;
        this.damage = 150;
        let sound = new Audio('assets/sounds/SunStrike.mp3');
        sound.play();
    }

    draw(ctx: CanvasRenderingContext2D, time: Number) {
        if(global.getInstance().debug){
            this.fillHitBox(ctx, "green");
        }
        super.draw(ctx, time);
    }

    getHitBox(): IRectangle {
        return <IRectangle>{
            x: this.x - (GameScene.TILE_SIZE/2),
            y: this.y - Math.round(GameScene.TILE_SIZE /3),
            width: GameScene.TILE_SIZE * 2,
            height: GameScene.TILE_SIZE

        }
    }

    onFrameChanged(frameIndex: number): void {
        if(frameIndex == 24){
            this.willDmg = true;
        }else if(frameIndex == 29){
            this.destroy();
        }

    }

    onHit(enemy: Enemy){
        if(this.isDestroyed)return;
        enemy.reduceHP(this.damage);

        SceneEngine.getInstance().injectGameObject(new TextEffect(
            {
                x: this.x,
                y: this.y
            },this.damage+""
        ).setColor("yellow"));

        this.willDmg = false;
    }


}