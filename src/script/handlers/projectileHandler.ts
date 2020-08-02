import Projectile from "../game/model/projectiles/projectile";
import Arrow from "../game/model/projectiles/arrow";
import {IRectangle} from "../../module/context/core/gameObjects/gameObject";
import Point from "../game/model/point";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import GameScene from "../game/scenes/gameScene";
import PerkHandler from "./perkHandler";
import Player from "../game/model/player";

export default class ProjectileHandler {
    fireTime: number;
    public static fireRate: number;

    constructor() {
        this.fireTime = 0;
        ProjectileHandler.fireRate = 0.5;
    }

    createProjectile(x: number, y: number, xVel: number, yVel: number, value: number): Projectile{
        this.fireTime+=value;
        if(this.fireTime >= ProjectileHandler.fireRate){
            this.fireTime-=ProjectileHandler.fireRate;
            return this.spawn(x,y,xVel,yVel);
        }
    }

    addFireTime(value: number){
        if(this.fireTime < ProjectileHandler.fireRate){
            this.fireTime+=value;
        }
    }

    spawn(x: number, y: number, xVel: number, yVel: number){
        let projectileSize = GameScene.TILE_SIZE * 2 /5;

        let projectile: Projectile = new Arrow(<IRectangle>{
            x: x,
            y: y,
            width: projectileSize,
            height: projectileSize
        }, new Point(xVel, yVel));
        let speed = 5;
        if(PerkHandler.getInstance().isActivate("projectilespeed+100%")) speed *=2;
        projectile.setSpeed(speed);
        projectile.setZIndex(20);

        x += xVel * 40;
        y += yVel * 40;
        projectile.setMiddlePoint(new Point(x, y));
        if(PerkHandler.getInstance().isActivate("dmg+10")){
            projectile.damage += 10;
        }
        if(PerkHandler.getInstance().isActivate("dmg+2foreveryexort"))projectile.damage += (Player.exort * 2);

        SceneEngine.getInstance().injectGameObject(projectile);

        return projectile;
    }

}