import Point from '../../../script/game/model/point';
export default abstract class GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number = 0;
    protected constructor(iGameObject: IGameObject) {
        this.x = iGameObject.x;
        this.y = iGameObject.y;
        this.width = iGameObject.width;
        this.height = iGameObject.height;
    }
    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract update(): void;

    setZIndex(zIndex: number): GameObject{
        this.zIndex = zIndex;
        return this;
    }

    isIntersect(g: GameObject) {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height && this.y + this.height >= g.y;
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
        this.x = point.x-this.width;
        this.y = point.y-this.height;
        return this;
    }

}

export interface IGameObject{
    x: number, y: number, width: number, height: number;
}
