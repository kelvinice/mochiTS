import Scene from "../context/core/scene"
import Ball from '../ball';
import { IGameObject } from '../context/core/gameObject';
import Global from '../context/general/global';

export default class GameScene extends Scene{
    balls: Ball[];
    
    constructor(){
        super();
       
        this.balls = [];
        this.addBall(new Ball(<IGameObject>{
            height : 200,
            width : 200,
            x : 10,
            y : 10
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