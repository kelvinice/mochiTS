import ImageGameObject from "../../../../module/context/core/gameObjects/imageGameObject";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";

export default class NumberHUD extends ImageGameObject{
    images: ImageBitmap[];

    constructor(iGameObject: IRectangle, images: ImageBitmap[]) {
        super(iGameObject, images[0]);
        this.images = images;
    }

    public setNumber(number: number){
        this.image = this.images[number];
    }


}