export default class NumberCounter {
    private readonly top: number;
    private readonly bottom: number;
    private current: number;
    private isUp: boolean;

    constructor(initial: number, top: number, bottom: number, isUp: boolean = true) {
        if(top <= bottom) throw new Error("Top must be bigger than bottom");
        this.current = initial;
        this.top = top;
        this.bottom = bottom;
        this.isUp = isUp;
    }

    update(value:number): number{
        if(!this.isUp){
            value = value * -1;
        }
        this.current += value;
        if(this.isUp){
            if(this.current >= this.top){
                this.current = this.top;
                this.isUp = false;
            }
        }else{
            if(this.current <= this.bottom){
                this.current = this.bottom;
                this.isUp = true;
            }
        }
        return this.current;
    }

    get(): number{
        return this.current;
    }

}