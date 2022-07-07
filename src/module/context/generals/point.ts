export default class Point{
    x: number;
    y: number;

    constructor(x: number= 0, y: number= 0){
        this.x = x;
        this.y = y;
    };
}

export interface IPoint{
    x: number, y: number;
}