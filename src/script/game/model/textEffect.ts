import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import TimeCounter from "../../handlers/timeCounter";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import GameScene from "../scenes/gameScene";
import Point from "./point";
import GameText from "./gameText";

export default class TextEffect extends GameText{
    timeCounter: TimeCounter;
    verticalMovSpeed: number;

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);
    }

    update(): void {
        this.y += this.verticalMovSpeed;
        if(this.timeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
            this.destroy();
        }
    }

    constructor(point: Point, text: string) {
        super(point, text);
        this.setZIndex(60);
        this.timeCounter = new TimeCounter(500);
        this.verticalMovSpeed = -0.5;
    }


}