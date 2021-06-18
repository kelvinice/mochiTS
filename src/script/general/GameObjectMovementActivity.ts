import Activity from "../../module/context/core/activities/activity";
import Point, {IPoint} from "../game/model/point";
import GameObject from "../../module/context/core/gameObjects/gameObject";

export default class GameObjectMovementActivity implements Activity{
    constructor(gameObject: GameObject, finishPoint: IPoint, speed: number) {
        this._finishPoint = finishPoint;
        this._speed = speed;
        this._gameObject = gameObject;
    }

    private _finishPoint: Point;
    private _speed: number;
    private _gameObject: GameObject;

    get finishPoint(): Point {
        return this._finishPoint;
    }

    get speed(): number {
        return this._speed;
    }

    updateActivity(timeInMilliSeconds: number): boolean {
        let power: number = timeInMilliSeconds / 1000;
        let distancePower: number = power * this.speed;
        let xDistance = this.finishPoint.x - this._gameObject.x;
        let yDistance = this.finishPoint.y - this._gameObject.y;

        let remainDistance: number = Math.abs(xDistance) + Math.abs(yDistance);
        if(remainDistance <= distancePower){
            this._gameObject.x = this.finishPoint.x;
            this._gameObject.y = this.finishPoint.y;
            return true;
        }
        let xPortion = xDistance / remainDistance;
        let yPortion = yDistance / remainDistance;

        let xMovement = xPortion * distancePower;
        let yMovement = yPortion * distancePower;

        this._gameObject.x += xMovement;
        this._gameObject.y += yMovement;

        return false;
    }



}