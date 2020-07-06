import GameObject, {IRectangle} from "../../../module/context/core/gameObject/gameObject";
import AnimateGameObject from "../../../module/context/core/gameObject/animateGameObject";

export default class Enemy extends AnimateGameObject{
    private _hp: number;

    constructor(iGameObject: IRectangle, image: ImageBitmap) {
        super(iGameObject, image);
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }

    update(): void {
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

}

