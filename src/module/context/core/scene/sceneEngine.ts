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
    private gameObjects : GameObject[] = [];

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
            this.gameObjects.forEach(go => {
                go.draw(this.ctx, time);
            });
            this.currentScene.onRender(this.ctx);

        }

        requestAnimationFrame((time: Number)=>this.render(time));
    }

    update(){

        // let currTime = new Date().getTime();
        // if(this.readyStatus == true){
        //     this.lapseTime += (currTime - this.previousTime)/1000;
        //
        // }else{
        //     this.lapseTime = 0;
        // }
        // if(this.lapseTime >= this.frameTime){
        //     this.lapseTime%= this.frameTime;
        //     this.previousTime = currTime;
            this.gameObjects.forEach(go => {
                go.update();
            });
            this.currentScene.onUpdate();


        // }


        
    }

    makeWindowReactive(){
        this.canvasController.setReactiveListener(this.handleWindowListener);
        this.canvasController.makeWindowReactive();
    }

    handleWindowListener(width: number, height: number){
        Global.getInstance().width = width;
        Global.getInstance().height = height;
    }

    updateScene(nextScene: Scene){
        this.readyStatus = false;
        this.currentScene = nextScene;
        this.currentScene.onCreated();
        this.readyStatus = true;
    }

    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
        this.gameObjects.sort((a:GameObject,b:GameObject)=>{
           return a.zIndex -  b.zIndex;
        });
    }

}