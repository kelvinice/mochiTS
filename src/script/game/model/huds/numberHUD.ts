import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import global from "../../../../module/context/generals/global";

export default class NumberHUD extends ImageGameObject{
    images: ImageBitmap[];

    constructor(iGameObject: IRectangle) {
        let numberImages = [];
        for (let i = 0; i < 10; i++) {
            numberImages.push(global.getInstance().assetManager.loadedImage["hud"+i]);
        }

        super(iGameObject, numberImages[0]);
        this.images = numberImages;
    }

    public setNumber(number: number){
        this.image = this.images[number];
    }


}