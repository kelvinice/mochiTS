import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Global from "../../../../module/context/generals/global";

export default class Cursor extends ImageGameObject{
    constructor(iGameObject: IRectangle) {
        super(iGameObject, Global.getInstance().assetManager.loadedImage["crosshair"]);
    }
}