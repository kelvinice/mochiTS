import GameObject, {IGameObject} from "../../../module/context/core/gameObject/gameObject";

export default class Enemy extends GameObject{
    hp: number;

    constructor(iGameObject: IGameObject) {
        super(iGameObject);
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }

    update(): void {
    }

}

