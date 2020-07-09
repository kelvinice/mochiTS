import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Heart from "./huds/heart";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";

export default class GameMenu extends GameObject{
    heartImage:ImageBitmap;
    heartYPosition: number;

    hearts: Heart[];

    hp: number;

    constructor(iGameObject: IRectangle, heartImage: ImageBitmap) {
        super(iGameObject);
        this.setZIndex(1000);

        this.hearts = [];
        this.heartImage = heartImage;
        this.heartYPosition = 100;
        let heartWidth = 100;
        let heartHeight = 100;
        this.hp = 3;

        for(let i=0;i<this.hp;i++){
            let heart = new Heart(<IRectangle>{
               x: this.x + (heartWidth * i),
                y: this.heartYPosition,
                width: heartWidth,
                height: heartHeight
            }, heartImage);
            heart.setZIndex(this.zIndex + 1);
            this.hearts.push(heart);
            SceneEngine.getInstance().injectGameObject(heart);
        }
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.fillStyle = "black"
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    update(): void {
    }

    public reduceHeart(){
        if(this.hp<=0)return;
        this.hp--;
        this.hearts[this.hp].destroy();
    }



}