import GameObject, {IRectangle} from "./gameObject";

export default class ImageGameObject extends GameObject{
    private _image: ImageBitmap;
    horizontalPadding: number;

    topPadding:number;
    bottomPadding: number;
    leftPadding: number;
    rightPadding: number;

    constructor(iRectangle: IRectangle, image: ImageBitmap = null){
        super(iRectangle);
        this._image = image;
        this.horizontalPadding = 0;
        this.topPadding = 0;
        this.bottomPadding = 0;
        this.leftPadding = 0;
        this.rightPadding = 0;
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
        ctx.drawImage(this._image, this.x-this.leftPadding,this.y-this.topPadding
            ,this.width + this.leftPadding + this.rightPadding,this.height + this.topPadding + this.bottomPadding);
    }




}