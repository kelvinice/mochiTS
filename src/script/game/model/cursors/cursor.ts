import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";

export default class Cursor extends ImageGameObject{
    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
    }
}