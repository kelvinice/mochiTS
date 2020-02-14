import Scene from "../../module/context/core/scene"
import Ball from '../../module/ball';
import { IGameObject } from '../../module/context/core/gameObject';
import Global from '../../module/context/general/global';

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
        this.addBall(new Ball(<IGameObject>{
            height : 100,
            width : 100,
            x : 600,
            y : 100
        }))
        this.addBall(new Ball(<IGameObject>{
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