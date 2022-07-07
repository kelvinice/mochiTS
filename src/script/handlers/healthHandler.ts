import GameObject, {IRectangle} from "../../module/context/core/gameObjects/game-object";
import Guid from "../../module/context/generals/guid";
import Tile from "../game/model/tiles/tile";

export default class HealthHandler extends GameObject{
    private hearts: Tile[];
    maxHP: number;

    constructor(iRectangle: IRectangle) {
        super(iRectangle);
        this.maxHP = 3;

        this.setZIndex(200+1);
        this.hearts = [];

        for (let i = 0; i < this.maxHP; i++) {
            let tile = new Tile(3, this.y,(this.x - (this.width * (i + 1)))/this.width,this.width);
            this.hearts.push(tile);
        }
    }

    getHeartNo(n: number){
        return this.hearts[n];
    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
        for (let i = 0; i < this.maxHP; i++) {
            if(this.hearts[i].isVisible)
                this.hearts[i].draw(ctx, time);
        }

    }

    update(): void {
    }




}