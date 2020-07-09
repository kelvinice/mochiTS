import Point from "../game/model/point";

export default class SizeCalculator {


    constructor() {
    }

    public static calculateSize(tileSize: number, width: number, height: number): Point{
        let point: Point = new Point();

        point.x = Math.floor(width / tileSize)
        point.y = Math.floor(height / tileSize)

        return point;
    }


}