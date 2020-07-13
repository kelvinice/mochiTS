export default class TrueRandom{
    private seed: number;
    
    constructor(seed: number = 1){
        this.seed = seed;
    }

    randSeed(){
        this.seed = Math.floor(Math.random() * (10000));
    }

    random() {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    randomNumber(min: number, max: number): number
    {
        return Math.floor(this.random() * (max - min) + min);
    }

}