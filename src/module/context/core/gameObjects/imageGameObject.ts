import GameObject, {IRectangle} from "./gameObject";

export default class ImageGameObject extends GameObject{
    private _image: ImageBitmap;
    constructor(iGameObject: IRectangle, image: ImageBitmap = null){
        super(iGameObject);
        this._image = image;
    }

    get image(): ImageBitmap {
        return this._image;
    }

    set image(value: ImageBitmap) {
        this._image = value;
    }


    update(): void {

    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.drawImage(this._image, this.x,this.y,this.width,this.height);
    }


}