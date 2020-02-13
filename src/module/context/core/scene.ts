import SceneEngine from './sceneEngine';
import GameObject from './gameObject';
export default abstract class Scene{
    constructor(){
        
    }

    abstract render(ctx: CanvasRenderingContext2D): void;

    abstract update(): void;

    addGameObject(gameObject: GameObject){
        SceneEngine.getInstance().addGameObject(gameObject);
    }

}