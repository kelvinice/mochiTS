import AnimateGameObject from "../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import {splitSprite} from "../../handlers/imageHandler";

export default class HitEffect extends AnimateGameObject{


    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);

        this.setZIndex(40);

        this.rectangles = splitSprite(image, 4, 1);
        this.animationController.addAnimation("hit", 0, 3, 1000);

        this.animationController.setAnim("hit");
    }


}