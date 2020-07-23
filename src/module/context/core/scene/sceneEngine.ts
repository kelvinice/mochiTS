import Global from '../../generals/global';
import Scene from './scene';
import CanvasController from '../../../canvasController';
import GameObject from '../gameObjects/gameObject';

export default class SceneEngine {
    canvas: HTMLCanvasElement;
    canvasController: CanvasController;
    ctx: CanvasRenderingContext2D;
    currentScene: Scene;
    readyStatus: boolean;
    private static instance: SceneEngine = null;

    private previousTime = -1;
    private fps = 60;
    private frameTime = 1000/this.fps;

    private last_time: number = this.getTime();

    private constructor(){}

    public deltaTime(): number{
        let time = this.getTime();
        return ((time - this.last_time) / 1000);
    }

    public deltaTimeMili(): number{
        let time = this.getTime();
        return ((time - this.last_time));
    }

    getTime(): number{
        return new Date().getTime();
    }

    initCanvas(canvas: HTMLCanvasElement){
        this.readyStatus = false;
        this.canvas = canvas;
        this.canvasController = new CanvasController(this.canvas);
        this.ctx = this.canvasController.getContext2d();
        this.currentScene = null;
        this.canvasController.setMaximize();
        Global.getInstance().width = this.canvasController.getWidthCanvas();
        Global.getInstance().height = this.canvasController.getHeightCanvas();
        // canvas.addEventListener("click", (e)=>this.mouseClick(e));
        canvas.addEventListener("mousemove", (e)=>this.mouseMove(e));
        canvas.addEventListener("mousedown", (e)=>this.mouseDown(e));
        canvas.addEventListener("mouseup", (e)=>this.mouseUp(e));
        document.addEventListener('contextmenu', (e)=>this.mouseContextMenu(e));
        window.addEventListener("keydown", (e)=>this.keyDown(e), false);
    }

    mouseContextMenu(e: MouseEvent){
        e.preventDefault();
        if(this.currentScene != null){
            this.currentScene.mouseContextMenu(e);
        }
    }

    keyDown(e: KeyboardEvent){
        if(this.currentScene != null){
            this.currentScene.keyDown(e);
        }
    }

    keyUp(e: KeyboardEvent){
        if(this.currentScene != null){
            this.currentScene.keyUp(e);
        }
    }

    mouseDown(e: MouseEvent){
        if(this.currentScene != null){
            this.currentScene.mouseDown(e);
        }
    }
    mouseUp(e: MouseEvent){
        if(this.currentScene != null){
            this.currentScene.mouseUp(e);
        }
    }

    mouseMove(e: MouseEvent){
        if(this.currentScene != null){
            this.currentScene.mouseMove(e);
        }
    }

    mouseClick(e: MouseEvent){
        if(this.currentScene != null){
            this.currentScene.mouseClick(e);
        }
    }

    getCanvasController(){
        return this.canvasController;
    }

    public static getInstance(){
        if(this.instance == null){
            this.instance = new SceneEngine();
        }
        return this.instance;
    }

    start(){
        this.canvasController.setMaximize();
        // setInterval(()=>this.update(), this.frameTime);
        this.recurrentUpdate();

        requestAnimationFrame((time: Number)=>this.render(time));
        // while(true){
        //     this.addFireTime();
        // }
    }

    render(time: Number) {
        if(this.readyStatus == true){
            this.ctx.clearRect(0,0,Global.getInstance().width, Global.getInstance().height);
            this.currentScene.processRender(this.ctx, time);
        }

        requestAnimationFrame((time: Number)=>this.render(time));
    }

    async recurrentUpdate(){
        this.previousTime = await new Date().getTime();
        while(true){
            await this.update();

            let currentTime = await new Date().getTime();
            let delta = await (currentTime- this.previousTime);

            let sleepTime = (this.frameTime) - delta;
            if(sleepTime > 0){
                await sleep(delta);
            }
            this.previousTime = await currentTime;
        }
    }

    update(){
        this.currentScene.processUpdate();
        this.last_time = this.getTime();
    }

    makeWindowReactive(){
        this.canvasController.setReactiveListener(this.handleWindowListener);
        this.canvasController.makeWindowReactive();
    }

    handleWindowListener(width: number, height: number){
        Global.getInstance().width = width;
        Global.getInstance().height = height;
        window.location.reload();
    }

    updateScene(nextScene: Scene){
        this.readyStatus = false;
        this.currentScene = nextScene;
        this.currentScene.onCreated();
        this.readyStatus = true;
    }

    injectGameObject(gameObject: GameObject){
        if(this.currentScene != null){
            this.currentScene.addGameObject(gameObject);
        }
    }

    reorderZIndex(){
        if(this.currentScene != null){
            this.currentScene.reorderZIndex();
        }
    }

    hideCursor(){
        this.canvas.style.cursor = "none";
    }

    showCursor(){
        this.canvas.style.cursor = "default";
    }

}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}