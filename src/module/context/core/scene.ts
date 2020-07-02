import SceneEngine from './sceneEngine';
import GameObject from './gameObject';
export default abstract class Scene{
    constructor(){}

    abstract onCreated(): void;

    abstract onRender(ctx: CanvasRenderingContext2D): void;

    abstract onUpdate(): void;

    addGameObject(gameObject: GameObject){
        SceneEngine.getInstance().addGameObject(gameObject);
    }

}