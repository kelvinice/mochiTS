
import Global from '../general/global';
import Scene from './scene';
import CanvasController from '../../canvasController';
import GameObject from './gameObject';


export default class SceneEngine {
    canvas: HTMLCanvasElement;
    canvasController: CanvasController;
    ctx: CanvasRenderingContext2D;
    currentScene: Scene;
    private static instance: SceneEngine = null;
    private gameobjects : GameObject[] = [];

    private constructor(){}

    initCanvas(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.canvasController = new CanvasController(this.canvas);
        this.ctx = this.canvasController.getContext2d();
        this.currentScene = null;
        this.canvasController.setMaximize();
        Global.getInstance().width = this.canvasController.getWidthCanvas();
        Global.getInstance().height = this.canvasController.getHeightCanvas();
        
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
        this.ctx.clearRect(0,0,Global.getInstance().width, Global.getInstance().height);
        this.gameobjects.forEach(go => {
            go.draw(this.ctx);
        });
        this.currentScene.render(this.ctx);
        requestAnimationFrame((time: Number)=>this.render(time));
    }

    update(){
        this.gameobjects.forEach(go => {
            go.update();
        });
        this.currentScene.update();
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
        this.currentScene = nextScene;
    }

    addGameObject(gameObject: GameObject){
        this.gameobjects.push(gameObject);
    }

}