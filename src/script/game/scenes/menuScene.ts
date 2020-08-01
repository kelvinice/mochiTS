import Scene from "../../../module/context/core/scene/scene";
import Global from "../../../module/context/generals/global";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import GameScene from "./gameScene";
import global from "../../../module/context/generals/global";

export default class MenuScene extends Scene{
    audio: HTMLAudioElement;

    playAudio(){
        this.audio.play().catch (error =>{
            setTimeout(()=>this.playAudio(), 1000);
        });
    }

    onCreated(): void {
        this.audio = new Audio("assets/sounds/intro.mp3");
        this.audio.loop = true;
        this.audio.play().catch (error =>{
            setTimeout(()=>this.playAudio(), 1000);
        });

    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(global.getInstance().assetManager.loadedImage["background"],
            0,0,
            SceneEngine.getInstance().canvas.width,
            SceneEngine.getInstance().canvas.height
            )

    }

    onUpdate(): void {
    }

    constructor() {
        super();

        let form: HTMLFormElement = document.getElementById("form-data") as HTMLFormElement;
        form.onsubmit = (e: Event) =>{
            e.preventDefault();
            let name: HTMLInputElement = form.elements.namedItem("name") as HTMLInputElement;
            let size = form.elements.namedItem("size") as HTMLInputElement;

            Global.getInstance().tile_size  = +size.value;
            Global.getInstance().name = name.value;
            SceneEngine.getInstance().updateScene(new GameScene());
            form.parentElement.parentElement.parentElement.style.visibility = "hidden";
            this.audio.pause();

        }
    }
}