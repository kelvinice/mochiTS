import Scene from "../../../module/context/core/scene/scene";
import global from "../../../module/context/generals/global";

export default class LoadingScene extends Scene{
    onCreated(): void {
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "black";
        ctx.fillText("Load asset...", 10, 20, 100);
        ctx.fillText(global.getInstance().assetManager.doneCount + "/" + global.getInstance().assetManager.ipaths.length, 110, 20);
    }

    onUpdate(): void {
    }

}