import Ball from '../model/ball';
import Scene from "../../../module/context/core/scene/scene";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";


export default class DummyScene extends Scene{
    private balls: Ball[];

    onCreated(): void {
        this.balls = [];
        this.addBall(new Ball({
            x:0,y:0,width:100,height:100
        }))
    }
    onRender(ctx: CanvasRenderingContext2D): void {
    }
    onUpdate(): void {
    }
    
    addBall(ball: Ball): void{
        this.balls.push(ball);
        SceneEngine.getInstance().injectGameObject(ball);
    }

    render(ctx: CanvasRenderingContext2D): void {
        
    }
    update(): void {
        // console.log(Global.getInstance().height);
    }
    

}