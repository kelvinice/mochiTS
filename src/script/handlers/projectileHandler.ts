import Projectile from "../game/model/projectiles/projectile";
import Arrow from "../game/model/projectiles/arrow";
import {IRectangle} from "../../module/context/core/gameObjects/gameObject";
import Point from "../game/model/point";
import SceneEngine from "../../module/context/core/scene/sceneEngine";

export default class ProjectileHandler {
    projectileImage: ImageBitmap;
    fireTime: number;
    fireRate: number;

    constructor(projectileImage: ImageBitmap) {
        this.projectileImage = projectileImage;
        this.fireTime = 0;
        this.fireRate = 0.5;
    }

    createProjectile(x: number, y: number, xVel: number, yVel: number, value: number): Projectile{
        this.fireTime+=value;
        if(this.fireTime >= this.fireRate){
            this.fireTime-=this.fireRate;
            return this.spawn(x,y,xVel,yVel);
        }
    }

    addFireTime(value: number){
        if(this.fireTime < this.fireRate){
            this.fireTime+=value;
        }
    }

    spawn(x: number, y: number, xVel: number, yVel: number){
        let projectileSize = 20;

        let projectile: Projectile = new Arrow(<IRectangle>{
            x: x,
            y: y,
            width: projectileSize,
            height: projectileSize
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