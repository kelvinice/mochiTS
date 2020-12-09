import TrueRandom from "./trueRandom";

export default class SoundPlayer{
    private trueRandom: TrueRandom;

    constructor() {
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }
    playRandomHitSound(){
        let rand = this.trueRandom.randomNumber(1,3);

        let audio = new Audio("assets/sounds/Razor_attack"+rand+".mpeg");
        audio.play();
    }

}