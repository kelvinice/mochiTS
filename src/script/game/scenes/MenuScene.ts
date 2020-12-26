import Scene from "../../../module/context/core/scene/scene";
import Global from "../../../module/context/generals/global";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import PlayScene from "./playScene";
import TimeCounter from "../../handlers/timeCounter";
import timeCounter from "../../handlers/timeCounter";

export default class MenuScene extends Scene{
    private logo: ImageBitmap;
    private blinkCounter: TimeCounter;
    private blinkNum = 0;
    private isBlink = true;

    onCreated(): void {
        this.logo = Global.getInstance().assetManager.loadedImage["bluejack"];
        this.blinkCounter = new TimeCounter(300);

    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, Global.getInstance().width, Global.getInstance().height);

        let width  = 1024;
        let height = 304;
        let winWidth = Global.getInstance().width;
        let winHeight = Global.getInstance().height;
        let xGap = 0;
        let yGap = 0;

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

        ctx.drawImage(this.logo, xGap,yGap, width, height);
        ctx.fillStyle = "white";
        ctx.font = "5em Agency FB";
        ctx.textAlign = "center";

        if(this.isBlink){
            ctx.globalAlpha = 0.2;
        }

        ctx.fillText("Click To Play", xGap+width/2,yGap+height + 100, winWidth);
        ctx.globalAlpha = 1;
    }

    onUpdate(): void {
        if(this.blinkCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMilli())){
            this.blinkNum++;
        }

        if(this.blinkNum > 3){
            this.isBlink = true;
            this.blinkNum = 0;
        }else if(this.blinkNum == 1){
            this.isBlink = false;
        }

    }

    mouseClick(e: MouseEvent) {
        super.mouseClick(e);
        SceneEngine.getInstance().updateScene(new PlayScene());
    }

}