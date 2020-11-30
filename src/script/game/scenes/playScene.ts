import Scene from "../../../module/context/core/scene/scene";

export default class PlayScene extends Scene{
    onCreated(): void {
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(0,0,100,100);
    }

    onUpdate(): void {
    }

}