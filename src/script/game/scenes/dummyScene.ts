import Global from '../../../module/context/general/global';
import { IRectangle } from '../../../module/context/core/gameObject/gameObject';
import Ball from '../../../module/ball';
import Scene from "../../../module/context/core/scene/scene";


export default class DummyScene extends Scene{
    onCreated(): void {
        throw new Error("Method not implemented.");
    }
    onRender(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }
    onUpdate(): void {
        throw new Error("Method not implemented.");
    }
    balls: Ball[];
    
    constructor(){
        super();
       
        this.balls = [];
        this.addBall(new Ball(<IRectangle>{
            height : 200,
            width : 200,
            x : 10,
            y : 10
        }))
        this.addBall(new Ball(<IRectangle>{
            height : 100,
            width : 100,
            x : 600,
            y : 100
        }))
        this.addBall(new Ball(<IRectangle>{
            height : 150,
            width : 150,
            x : 300,
            y : 400
        }))
    }

    addBall(ball: Ball): void{
        this.balls.push(ball);
        this.addGameObject(ball);
    }

    render(ctx: CanvasRenderingContext2D): void {
        
    }
    update(): void {
        // console.log(Global.getInstance().height);
        
    }
    

}