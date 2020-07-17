import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";

export default class SunStrike extends AnimateGameObject{


    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
    }
}