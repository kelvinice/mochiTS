import Projectile from "../game/model/projectiles/projectile";
import Arrow from "../game/model/projectiles/arrow";
import {IRectangle} from "../../module/context/core/gameObjects/gameObject";
import Point from "../game/model/point";
import SceneEngine from "../../module/context/core/scene/sceneEngine";

export default class ProjectileHandler {
    projectileImage: ImageBitmap;
    currentValue: number;
    valueToSpawn: number;

    constructor(projectileImage: ImageBitmap) {
        this.projectileImage = projectileImage;
        this.currentValue = 0;
        this.valueToSpawn = 1;
    }

    createProjectile(x: number, y: number, xVel: number, yVel: number, value: number): Projectile{
        this.currentValue+=value;
        if(this.currentValue >= this.valueToSpawn){
            this.currentValue-=this.valueToSpawn;
            return this.spawn(x,y,xVel,yVel);
        }
    }

    update(value: number){
        if(this.currentValue < this.valueToSpawn){
            this.currentValue+=value;
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