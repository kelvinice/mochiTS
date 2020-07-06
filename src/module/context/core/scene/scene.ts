import SceneEngine from './sceneEngine';
import GameObject from '../gameObjects/gameObject';
export default abstract class Scene{

    abstract onCreated(): void;

    abstract onRender(ctx: CanvasRenderingContext2D): void;

    abstract onUpdate(): void;

    addGameObject(gameObject: GameObject){
        SceneEngine.getInstance().addGameObject(gameObject);
    }

    mouseClick(e: MouseEvent){}
}