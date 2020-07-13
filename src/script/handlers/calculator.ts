import Point from "../game/model/point";

export default class Calculator {
    constructor() {
    }

    public static calculateSize(tileSize: number, width: number, height: number): Point{
        let point: Point = new Point();
        point.x = Math.floor(width / tileSize);
        point.y = Math.floor(height / tileSize);

        return point;
    }

    public static calculateVelocity(startPoint: Point, endPoint: Point): Point{
        let velocity = new Point();

        let xDif = endPoint.x - startPoint.x;
        let yDif = endPoint.y - startPoint.y;
        let dif = Math.abs(xDif)+ Math.abs(yDif);
        let maxVel= 1;

        let xVel = xDif/dif * maxVel;
        let yVel = yDif/dif * maxVel;


        return new Point(xVel, yVel);

    }

}