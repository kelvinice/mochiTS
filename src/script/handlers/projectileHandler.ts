import Projectile from "../game/model/projectiles/projectile";
import Arrow from "../game/model/projectiles/arrow";
import {IRectangle} from "../../module/context/core/gameObjects/gameObject";
import Point from "../game/model/point";
import SceneEngine from "../../module/context/core/scene/sceneEngine";

export default class ProjectileHandler {
    projectileImage: ImageBitmap;

    constructor(projectileImage: ImageBitmap) {
        this.projectileImage = projectileImage;
    }

    createProjectile(x: number, y: number, xVel: number, yVel: number): Projectile{
        let projectileSize = 20;

        let projectile: Projectile = new Arrow(<IRectangle>{
            x: x,
            y: y,
            width: 20,
            height: 20
        }, new Point(xVel, yVel), this.projectileImage);
        projectile.setSpeed(5);
        projectile.setZIndex(20);

        x += xVel * 40;
        y += yVel * 40;
        projectile.setMiddlePoint(new Point(x, y));

        SceneEngine.getInstance().injectGameObject(projectile);

        return projectile;

    }

}