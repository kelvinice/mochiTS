import GameObject, {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import AnimateGameObject from "../../../../module/context/core/gameObjects/animateGameObject";

export default abstract class Enemy extends AnimateGameObject{
    private _hp: number;
    private _maxHp: number;

    get maxHp(): number {
        return this._maxHp;
    }

    set maxHp(value: number) {
        this._maxHp = value;
    }

    constructor(iGameObject: IRectangle, image: ImageBitmap= null) {
        super(iGameObject, image);
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        super.draw(ctx, time);

        let sideSize = 3;
        let barWidth = this.width-sideSize;
        let remainHPWidth = this.hp/this.maxHp * barWidth;

        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y+this.height, this.width, 8);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x+sideSize/2, this.y+this.height+sideSize/2, barWidth, 8-sideSize);
    }

    update(): void {
        super.update();
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

}

