export default class TimeCounter{
    targetTime: number;
    counter:number;
    previousTime: number;

    constructor(targetTime: number) {
        this.targetTime = targetTime;
        this.counter = 0;
        this.previousTime = -1;
    }

    updateTimeByCurrentTimeMili(time: number): boolean{
        if(this.previousTime != -1){
            let difference = time - this.previousTime;
            this.counter+= difference;
            if(this.counter >= this.targetTime) {
                this.counter %= this.targetTime;
                this.previousTime = time;
                return true;
            }
        }

        this.previousTime = time;
        return false;

    }

    updateTimeCounter(time: number): boolean{
        this.counter+= time;
        if(this.counter >= this.targetTime) {
            this.counter %= this.targetTime;
            return true;
        }
        return false;

    }

    setPreviousTime(time: number){
        this.previousTime = time;
    }

    setTargetTime(time: number){
        this.targetTime = time;
    }





}