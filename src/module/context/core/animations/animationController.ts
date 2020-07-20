import Animation from "./animation";

export default class AnimationController{
    animations : Animation[];
    activeAnimation: Animation;
    index: number;
    counter: number;
    frameListener: FrameListener;

    constructor() {
        this.animations = [];
        this.counter = 0;
        this.frameListener = null;
    }

    public addAnimation(name: string, begin: number, end: number, delay: number): void{
        this.animations.push(new Animation(name, begin, end, delay));
    }

    public setAnim(name: string): void{
        if(this.activeAnimation != null && this.activeAnimation.name === name)return;
        for (const animation of this.animations) {
            if(animation.name === name){
                this.activeAnimation = animation;
                this.index = animation.begin;
                return;
            }
        }
        console.log("Animation name not found")
    }

    public updateAnimation(frameTime: number = 1000/60): void
    {
        if(this.activeAnimation == null){
            return;
        }
        this.counter+=frameTime;

        if(this.counter >= this.activeAnimation.delay){
            this.counter%=this.activeAnimation.delay;
            if(this.frameListener != null){
                this.frameListener.onFrameChanged(this.index);
            }
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

    addFrameListener(frameListener: FrameListener){
        this.frameListener = frameListener;
    }

}

export interface FrameListener {
    onFrameChanged(frameIndex: number): void;
}