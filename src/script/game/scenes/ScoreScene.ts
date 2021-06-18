import Scene from "../../../module/context/core/scene/scene";
import Global from "../../../module/context/generals/global";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import PlayScene from "./playScene";
import TimeCounter from "../../handlers/timeCounter";
import NumberCounter from "../../general/numberCounter";

export default class ScoreScene extends Scene{
    private logo: ImageBitmap;
    private blinkCounter: TimeCounter;
    private blinkNum = 0;
    private isBlink = true;
    private numberCounter: NumberCounter;
    private score: number;

    onCreated(): void {
        this.logo = Global.getInstance().assetManager.loadedImage["bluejack"];
        this.blinkCounter = new TimeCounter(30);
        this.numberCounter = new NumberCounter(10, 30,10);
    }

    constructor(score: number) {
        super();
        this.score = score;
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, Global.getInstance().width, Global.getInstance().height);

        let width  = 1024;
        let height = 304;
        let winWidth = Global.getInstance().width;
        let winHeight = Global.getInstance().height;
        let xGap: number;
        let yGap: number;

        if(!(width <= winWidth && height <= winHeight)){
            if(width > winWidth){
                let scale = winWidth/width;
                width = winWidth;
                height = height * scale;
            }
            if(height > winHeight){
                let scale = winHeight/height;
                height = winHeight;
                width = width * scale;
            }

        }
        xGap = (winWidth - width) / 2;
        yGap = (winHeight - height) / 2;

        ctx.fillStyle = "white";
        ctx.font = "5em Agency FB";
        ctx.textAlign = "center";

        var blur = this.numberCounter.get();

        ctx.textBaseline = "top";

        ctx.shadowOffsetX = 1;

        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;
        // ctx.drawImage(this.logo, xGap,yGap, width, height);
        ctx.shadowColor = "red";
        ctx.fillText("Your Score: "+this.score, (xGap+width/2),yGap+height - 100 , winWidth);
        if(this.isBlink){
            ctx.globalAlpha = 0.2;
        }
        ctx.shadowColor = "yellow";
        ctx.fillText("Click To Play Again", (xGap+width/2),yGap+height + 100, winWidth);
        ctx.globalAlpha = 1;
        ctx.shadowColor = "transparent";
    }

    onUpdate(): void {
        if(this.blinkCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMilli())){
            this.blinkNum++;
            this.numberCounter.update(0.4);
        }

        if(this.blinkNum > 30){
            this.isBlink = true;
            this.blinkNum = 0;
        }else if(this.blinkNum == 10){
            this.isBlink = false;
        }
    }

    mouseClick(e: MouseEvent) {
        super.mouseClick(e);
        SceneEngine.getInstance().updateScene(new PlayScene());
    }

}