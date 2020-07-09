import Global from '../../generals/global';
import Scene from './scene';
import CanvasController from '../../../canvasController';
import GameObject from '../gameObjects/gameObject';
import scene from "./scene";

export default class SceneEngine {
    canvas: HTMLCanvasElement;
    canvasController: CanvasController;
    ctx: CanvasRenderingContext2D;
    currentScene: Scene;
    readyStatus: boolean;
    private static instance: SceneEngine = null;


    lapseTime = 0;
    previousTime = -1;
    fps = 60;
    frameTime = 1000/this.fps;

    private constructor(){}

    initCanvas(canvas: HTMLCanvasElement){
        this.readyStatus = false;
        this.canvas = canvas;
        this.canvasController = new CanvasController(this.canvas);
        this.ctx = this.canvasController.getContext2d();
        this.currentScene = null;
        this.canvasController.setMaximize();
        Global.getInstance().width = this.canvasController.getWidthCanvas();
        Global.getInstance().height = this.canvasController.getHeightCanvas();
        canvas.addEventListener("click", (e)=>this.mouseClick(e));
        canvas.addEventListener("mousemove", (e)=>this.mouseMove(e));

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
        if(this.instance === null){
            this.instance = new SceneEngine();
        }
        return this.instance;
    }

    start(){
        this.canvasController.setMaximize();
        setInterval(()=>this.update(), this.frameTime);

        requestAnimationFrame((time: Number)=>this.render(time));
        // while(true){
        //     this.update();
        // }
    }

    render(time: Number) {
        if(this.readyStatus == true){
            this.ctx.clearRect(0,0,Global.getInstance().width, Global.getInstance().height);
            this.currentScene.processRender(this.ctx, time);
        }

        requestAnimationFrame((time: Number)=>this.render(time));
    }

    update(){
        this.currentScene.processUpdate();
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

}