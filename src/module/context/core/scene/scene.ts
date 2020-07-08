import SceneEngine from './sceneEngine';
import GameObject from '../gameObjects/gameObject';
export default abstract class Scene{
    private gameObjects : GameObject[] = [];
    private willClearTrash = false;

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


        this.gameObjects.forEach(go => {
            go.update();
        });
        this.onUpdate();

        this.deleteTrash();
    }



    deleteTrash(): void{
        let destroyeds = this.gameObjects.filter(value => {
            return value.isDestroyed;
        });

        for (const gameObject of destroyeds) {
            this.noticeDelete(gameObject);
        }

        this.gameObjects = this.gameObjects.filter(value => {
            return !value.isDestroyed;
        });

    }

    noticeDelete(gameObject: GameObject){}

}