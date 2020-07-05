import GameObject, {IGameObject} from "./gameObject";

export default class ImageGameObject extends GameObject{
    image: ImageBitmap;
    constructor(iGameObject: IGameObject, image: ImageBitmap){
        super(iGameObject);
        this.image = image;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
    }
    update(): void {

    }


}