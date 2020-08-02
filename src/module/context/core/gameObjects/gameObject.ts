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

    protected constructor(iRectangle: IRectangle) {
        this.x = iRectangle.x;
        this.y = iRectangle.y;
        this.width = iRectangle.width;
        this.height = iRectangle.height;
        this._isDestroyed = false;
        this._id = Guid.newGuid();
    }
    abstract draw(ctx: CanvasRenderingContext2D, time: Number): void;
    abstract update(): void;

    setZIndex(zIndex: number): GameObject{
        this.zIndex = zIndex;
        return this;
    }

    /**
     * @param g: Gameobject
     * @deprecated this method compare real size of object instead of object hit box
     */
    isIntersect(g: IRectangle): boolean {
        return this.x <= g.x + g.width && this.x + this.width >= g.x
            && this.y <= g.y + g.height && this.y + this.height >= g.y;
    }

    isIntersectSoft(g: IRectangle) {
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
        return new Point(Math.round(x),Math.round(y));
    }

    setMiddlePoint(point: Point): GameObject{
        this.x = point.x-this.width/2;
        this.y = point.y-this.height/2;
        return this;
    }

    fillHitBox(ctx: CanvasRenderingContext2D, color: string){
        ctx.fillStyle = color;
        let h = this.getHitBox();
        ctx.fillRect(h.x, h.y, h.width, h.height);
    }

    destroy(){
        this._isDestroyed = true;
    }

    restore(){
        this._isDestroyed = false;
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }

    public getHitBox(): IRectangle{
        return <IRectangle>{
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        }
    }

    isCollide(gameObject: GameObject): boolean{
        let a = this.getHitBox();
        let g = gameObject.getHitBox();

        return a.x < g.x + g.width && a.x + a.width > g.x
            && a.y < g.y + g.height && a.y + a.height > g.y;
    }
}

export interface IRectangle{
    x: number, y: number, width: number, height: number;
}
