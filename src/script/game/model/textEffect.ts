import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import TimeCounter from "../../handlers/TimeCounter";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";

export default class TextEffect extends GameObject{
    timeCounter: TimeCounter;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        ctx.font = "bold 10pt arial"
        ctx.fillStyle = "red";
        ctx.fillText("Ouch..",this.x, this.y);
    }

    update(): void {
        this.y-= 0.5;
        if(this.timeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
            this.destroy();
        }

    }


    constructor(iGameObject: IRectangle) {
        super(iGameObject);
        this.setZIndex(50);
        this.timeCounter = new TimeCounter(500);
    }
}