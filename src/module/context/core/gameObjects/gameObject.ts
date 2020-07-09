import Point from '../../../../script/game/model/point';
import Guid from "../../../../script/general/guid";
export default abstract class GameObject {
    get id(): string {
        return this._id;
    }
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number = 0;
    private _isDestroyed: boolean;
    private readonly _id: string;

    protected constructor(iGameObject: IRectangle) {
        this.x = iGameObject.x;
        this.y = iGameObject.y;
        this.width = iGameObject.width;
        this.height = iGameObject.height;
        this._isDestroyed = false;
        this._id = Guid.newGuid();
    }
    abstract draw(ctx: CanvasRenderingContext2D, time: Number): void;
    abstract update(): void;

    setZIndex(zIndex: number): GameObject{
        this.zIndex = zIndex;
        return this;
    }

    isIntersect(g: GameObject) {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height && this.y + this.height >= g.y;
    }

    isIntersectSoft(g: GameObject) {
        return this.x < g.x + g.width && this.x + this.width > g.x
            && this.y < g.y + g.height && this.y + this.height > g.y;
    }

    isHorizontalLinearIntersect(g: GameObject) {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height / 2 && this.y + this.height >= g.y + g.height / 2;
    }

    isIn(x: number, y: number) {
        return this.x <= x && this.x + this.width >= x
            && this.y <= y && this.y + this.height >= y;
    }

    getMiddlePoint(): Point{
        let x = this.x + (this.width/2);
        let y = this.y + (this.height/2);
        return new Point(x,y);
    }

    setMiddlePoint(point: Point): GameObject{
        this.x = point.x-this.width/2;
        this.y = point.y-this.height/2;
        return this;
    }

    destroy(){
        this._isDestroyed = true;
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }
}

export interface IRectangle{
    x: number, y: number, width: number, height: number;
}
