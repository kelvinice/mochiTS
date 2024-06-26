import Point from '../../generals/point';
import Guid from "../../generals/guid";
import SceneEngine from "../scene/sceneEngine";
import LineSegment from '../../generals/line-segment';
export default abstract class GameObject {
    get id(): string {
        return this._id;
    }
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number = 0;
    private _isVisible: boolean;
    private _isDestroyed: boolean;
    private readonly _id: string;

    get isVisible(): boolean {
        return this._isVisible;
    }

    setVisible(value: boolean) {
        this._isVisible = value;
    }

    protected constructor(iRectangle: IRectangle) {
        this.x = iRectangle.x;
        this.y = iRectangle.y;
        this.width = iRectangle.width;
        this.height = iRectangle.height;
        this._isDestroyed = false;
        this._id = Guid.newGuid();
        this._isVisible = true;
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
     * @author kelvin ice
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

    /**
     * this method inject though sceneEngine, use destroyGameObject from scene method to direct inject to scene
     * @author kelvin ice
     */
    destroy(){
        this._isDestroyed = true;
        SceneEngine.getInstance().injectDestroyedGameObject(this);
    }

    /**
     * @deprecated deleted gameObject cannot restored anymore
     * @author kelvin ice
     */
    restore(){
        this._isDestroyed = false;
    }

    get isDestroyed(): boolean {
        return this._isDestroyed;
    }
    setDestroyed(status: boolean) {
        this._isDestroyed = status;
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

    public getSegments(): LineSegment[]{
        let segments = [];
        let x0y0 = new Point(this.x, this.y);
        let x0y1 = new Point(this.x+this.width, this.y);
        let x1y0 = new Point(this.x, this.y+this.height);
        let x1y1 = new Point(this.x+this.width, this.y+this.height);
        segments.push(new LineSegment(x0y0, x1y0));
        segments.push(new LineSegment(x1y0, x1y1));
        segments.push(new LineSegment(x1y1, x0y1));
        segments.push(new LineSegment(x0y1, x0y0));
        return segments;
    }
}

export interface IRectangle{
    x: number, y: number, width: number, height: number;
}
