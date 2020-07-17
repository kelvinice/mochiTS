import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../../handlers/imageHandler";
import GameScene from "../../scenes/gameScene";
import global from "../../../../module/context/generals/global";

export default class SunStrike extends AnimateGameObject{


    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
        this.setZIndex(30);

        this.rectangles = splitSprite(image, 5, 6);
        this.animationController.addAnimation("burn", 0, 29, 100);

        this.animationController.setAnim("burn");

        this.topPadding = GameScene.TILE_SIZE * 3;
        this.leftPadding = GameScene.TILE_SIZE*2;
        this.rightPadding = GameScene.TILE_SIZE*2;
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


}