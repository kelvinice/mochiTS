export default class TrueRandom{
    private seed: number;
    
    constructor(seed: number = 1){
        this.seed = seed;
    }

    random() {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

}