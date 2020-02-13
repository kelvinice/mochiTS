import GameObject from "./context/core/gameObject";
import Global from "./context/general/global";
import { IGameObject } from './context/core/gameObject';


export default class Ball extends GameObject{
    velX: number;
    velY: number;
    isCollide: boolean;

    constructor(iGameObject: IGameObject){
        super(iGameObject);
        this.velX = 1;
        this.velY = 1;
        this.isCollide = false;
    }

    draw(ctx: CanvasRenderingContext2D){
        if(this.isCollide){
            ctx.fillStyle = "red";
        }else{
            ctx.fillStyle = "black";
        }
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    update(){
        this.x+=this.velX*5;
        this.y+=this.velY*5;
        
        if(this.x+this.width >= Global.getInstance().width || this.x <=0){
            this.velX*=-1;
        }
        if(this.y+this.height >= Global.getInstance().height || this.y <=0){
            this.velY*=-1;
        }
        this.isCollide = false;
    }


}