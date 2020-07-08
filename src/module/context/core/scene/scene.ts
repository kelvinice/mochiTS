import SceneEngine from './sceneEngine';
import GameObject from '../gameObjects/gameObject';
export default abstract class Scene{
    private gameObjects : GameObject[] = [];

    abstract onCreated(): void;

    abstract onRender(ctx: CanvasRenderingContext2D): void;

    abstract onUpdate(): void;

    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
        this.gameObjects.sort((a:GameObject,b:GameObject)=>{
            return a.zIndex -  b.zIndex;
        });
    }

    mouseClick(e: MouseEvent){}

    processRender(ctx: CanvasRenderingContext2D, time: Number): void{
        this.gameObjects.forEach(go => {
            go.draw(ctx, time);
        });
        this.onRender(ctx);


    }

    processUpdate(): void{
        this.gameObjects = this.gameObjects.filter(value => {
            return !value.isDestroyed;
        })

        this.gameObjects.forEach(go => {
            go.update();
        });
        this.onUpdate();
    }

}