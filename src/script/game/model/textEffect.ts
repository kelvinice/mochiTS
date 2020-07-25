import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import TimeCounter from "../../handlers/timeCounter";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import GameScene from "../scenes/gameScene";

export default class TextEffect extends GameObject{
    timeCounter: TimeCounter;
    color: string;
    text: string;
    verticalMovSpeed: number;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        let fontSize = Math.round(GameScene.TILE_SIZE / 5);
        ctx.font = "bold "+fontSize+"pt arial"
        ctx.fillStyle = this.color;
        ctx.fillText(this.text,this.x, this.y);
    }

    update(): void {
        this.y += this.verticalMovSpeed;
        if(this.timeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
            this.destroy();
        }
    }

    constructor(iGameObject: IRectangle, text: string) {
        super(iGameObject);
        this.setZIndex(60);
        this.timeCounter = new TimeCounter(500);
        this.color = "red";
        this.setText(text);
        this.verticalMovSpeed = -0.5;
    }

    setColor(color: string): TextEffect{
        this.color = color;
        return this;
    }

    setText(text:string){
        this.text = text;
    }
}