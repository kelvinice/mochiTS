import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Global from "../../../../module/context/generals/global";
import {splitSprite} from "../../../handlers/imageHandler";
import GameScene from "../../scenes/gameScene";
import Player from "../player";

export default class EnemySunStrike extends AnimateGameObject{
    public willDmg: boolean;
    public damage: number;
    private target: Player;

    constructor(iGameObject: IRectangle, target: Player) {
        super(iGameObject, Global.getInstance().assetManager.loadedImage["dark-sunStrike"]);
        this.target = target;
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

    update() {
        if(this.willDmg){
            if(this.target.isCollide(this)){
                this.target.onHitWithEnemy();
                this.destroy();
            }
        }
    }
}