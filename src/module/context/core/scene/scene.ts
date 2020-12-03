import GameObject from '../gameObjects/gameObject';
export default abstract class Scene{
    private gameObjects : GameObject[] = [];
    private toDeletes: GameObject[] = [];
    lapseTime = 0;
    previousTime = -1;
    fps = 60;
    frameTime = 1000/this.fps;

    /**
     * Called before render and update start
     */
    abstract onCreated(): void;

    /**
     * Drawing logic
     */
    abstract onRender(ctx: CanvasRenderingContext2D): void;

    /**
     * Calculation and data change logic
     */
    abstract onUpdate(): void;

    addGameObject(gameObject: GameObject){
        this.gameObjects.push(gameObject);
        this.reorderZIndex();
    }

    reorderZIndex(){
        this.gameObjects.sort((a:GameObject,b:GameObject)=>{
            return a.zIndex -  b.zIndex;
        });
    }

    mouseContextMenu(e: MouseEvent){}

    mouseClick(e: MouseEvent){}

    mouseMove(e: MouseEvent){}

    mouseDown(e: MouseEvent){}

    mouseUp(e: MouseEvent){}

    keyDown(e: KeyboardEvent){}

    keyUp(e: KeyboardEvent){}

    processRender(ctx: CanvasRenderingContext2D, time: Number): void{
        let gameObjects = [...this.gameObjects];

        gameObjects.forEach(go => {
            go.draw(ctx, time);
        });
        this.onRender(ctx);
    }

    processUpdate(): void{
        let gameObjects = [...this.gameObjects];
        gameObjects.forEach(go => {
            go.update();
        });
        this.onUpdate();
        this.deleteTrash();
    }

    deleteTrash(): void{
        // let destroyeds = this.gameObjects.filter(value => {
        //     return value.isDestroyed;
        // });

        let destroyeds = [...this.toDeletes];

        for (const gameObject of destroyeds) {
            this.noticeDelete(gameObject);
        }

        while(destroyeds.length > 0){
            let curr = destroyeds.pop();
            let idx = this.gameObjects.indexOf(curr);
            if(idx >= 0){
                this.gameObjects.splice(this.gameObjects.indexOf(curr) , 1);
            }else{
                console.log("Object Not Found!")
            }

            this.toDeletes.splice(this.toDeletes.indexOf(curr), 1);
        }


        // this.gameObjects = this.gameObjects.filter(value => {
        //     return !value.isDestroyed;
        // });
    }

    noticeDelete(gameObject: GameObject){}

    destroyGameObject(gameObject: GameObject){
        gameObject.setDestroyed(true);
        this.toDeletes.push(gameObject);
    }
}
