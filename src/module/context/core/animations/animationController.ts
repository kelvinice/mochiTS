import Animation from "./animation";

export default class AnimationController{
    animations : Animation[];
    activeAnimation: Animation;
    index: number;
    counter: number;
    constructor() {
        this.animations = [];
    }

    public updateAnimation(frameTime: number = 1000/60): void
    {
        if(this.activeAnimation == null){
            return;
        }
        this.counter+=frameTime;
        if(this.counter >= this.activeAnimation.delay){
            this.counter%=this.activeAnimation.delay;
            // this.counter=0;
        }else{
            return;
        }
        // if(this.stopCounter>0){
        //     this.stopCounter--;
        //     return;
        // }
        this.index++;

        if(this.index > this.activeAnimation.end){
            this.index = this.activeAnimation.begin;
        }else if(this.index < this.activeAnimation.begin){
            this.index = this.activeAnimation.end;
        }
    }

}