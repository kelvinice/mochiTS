import Animation from "./animation";

export default class AnimationController{
    animations : Animation[];
    activeAnimation: Animation;
    index: number;
    counter: number;
    constructor() {
        this.animations = [];

    }

}