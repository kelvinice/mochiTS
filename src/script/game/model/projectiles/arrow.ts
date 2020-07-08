import Projectile from "./projectile";
import {IRectangle} from "../../../../module/context/core/gameObjects/gameObject";
import Point from "../point";

export default class Arrow extends Projectile{
    image: ImageBitmap;
    rotation: number;

    constructor(iGameObject: IRectangle, velocity: Point, image: ImageBitmap) {
        super(iGameObject, velocity);
        this.image = image;
        this.rotation= 180+(Math.atan2(velocity.x,velocity.y) / (2* Math.PI) * 360 *-1);

    }

    draw(ctx: CanvasRenderingContext2D) {
        var cx     = this.x + 0.5 * this.width;   // x of shape center
        var cy     = this.y + 0.5 * this.height;  // y of shape center

        super.draw(ctx);
        ctx.save();
        ctx.translate( cx, cy );
        ctx.rotate( (Math.PI / 180) * this.rotation );
        ctx.translate( -cx, -cy );
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height*2);
        ctx.restore();
    }
}