import Global from '../../general/global';
import Scene from './scene';
import CanvasController from '../../../canvasController';
import GameObject from '../gameObject/gameObject';

export default class SceneEngine {
    canvas: HTMLCanvasElement;
    canvasController: CanvasController;
    ctx: CanvasRenderingContext2D;
    currentScene: Scene;
    readyStatus: boolean;
    private static instance: SceneEngine = null;
    private gameobjects : GameObject[] = [];

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
        setInterval(()=>this.update(), 1000/60);
        requestAnimationFrame((time: Number)=>this.render(time));
    }

    render(time: any) {
        if(this.readyStatus == true){
            this.ctx.clearRect(0,0,Global.getInstance().width, Global.getInstance().height);
            this.gameobjects.forEach(go => {
                go.draw(this.ctx);
            });
            this.currentScene.onRender(this.ctx);
        }
        requestAnimationFrame((time: Number)=>this.render(time));
    }

    update(){
        if(this.readyStatus == true){
            this.gameobjects.forEach(go => {
                go.update();
            });
            this.currentScene.onUpdate();
        }
        
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
        this.gameobjects.push(gameObject);
        this.gameobjects.sort((a:GameObject,b:GameObject)=>{
           return a.zIndex -  b.zIndex;
        });
    }

}