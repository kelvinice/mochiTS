import GameObject from "./module/game/gameObject";
import { splitSprite } from "./module/general/asset";

export default class PersonAnimation extends GameObject{
    constructor(img, ...args){
        super(...args);
        this.img = img;
        this.sprites = splitSprite(img,8,1);
        this.spriteSize = 8;
        this.spriteIdx = 0;
        this.lastTime = Date.now();
        this.lapseTime = 0;
        this.timePerFrame = 100;
    }

    draw(ctx){
        let now = Date.now();
        this.lapseTime+=(now-this.lastTime);
        this.lastTime = now;
        if(this.lapseTime>=this.timePerFrame){
            this.lapseTime %= this.timePerFrame;
            this.spriteIdx=(this.spriteIdx+1)%this.spriteSize;
        }

        let currentSprite = this.sprites[this.spriteIdx];
        ctx.drawImage(this.img,currentSprite.x,currentSprite.y,currentSprite.width,currentSprite.height,this.x,this.y,this.width,this.height);
    }

    update(){
        

    }



}
