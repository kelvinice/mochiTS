import Scene from '../../../module/context/core/scene/scene';
import AssetManager from '../../../module/context/generals/asset';
import MapCreator from '../../handlers/mapCreator';
import GameObject, { IRectangle } from '../../../module/context/core/gameObjects/gameObject';
import Tile from '../model/tiles/tile';
import GameTile from '../model/tiles/gameTile';
import Player from "../model/player";
import Point from "../model/point";
import Projectile from "../model/projectiles/projectile";
import Enemy from "../model/enemies/enemy";
import GameMenu from "../model/gameMenu";
import Global from "../../../module/context/generals/global";
import Calculator from "../../handlers/calculator";
import Cursor from "../model/cursors/cursor";
import RectangleGameObject from "../../../module/context/core/gameObjects/rectangleGameObject";
import Spawner from "../model/enemies/spawner";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import SpawnHandler from "../../handlers/spawnHandler";
import ProjectileHandler from "../../handlers/projectileHandler";
import TrueRandom from "../../handlers/trueRandom";
import SkeletonSpawner from "../model/enemies/skeletonSpawner";

export default class GameScene extends Scene{
    pathImage: ImageBitmap;
    stoneImage: ImageBitmap;
    brickImage: ImageBitmap;
    switchGreenImage: ImageBitmap;
    switchRedImage: ImageBitmap;
    switchBlueImage: ImageBitmap;
    playerImage: ImageBitmap;
    slimeImage: ImageBitmap;
    skeletonImage: ImageBitmap;
    arrowImage: ImageBitmap;
    bowImage: ImageBitmap;
    heartImage: ImageBitmap;
    crosshairImage: ImageBitmap;
    numberImages: ImageBitmap[];

    public static TILE_SIZE: number = 50;

    maps: Tile[][];

    cursor: Cursor;
    player: Player;
    enemies: Enemy[];
    projectiles: Projectile[];
    gameMenu: GameMenu;
    obstacles: Tile[];
    spawners: Spawner[];

    spawnHandler: SpawnHandler;
    projectileHandler: ProjectileHandler;

    nextVelX = 0;
    nextVelY = 0;

    mouseHold: boolean = false;
    trueRandom: TrueRandom;

    constructor(assetManager: AssetManager){
        super();
        this.enemies = [];
        this.projectiles = [];
        this.numberImages = [];
        this.obstacles = [];
        this.spawners = [];

        this.pathImage = assetManager.loadedImage["path"];
        this.stoneImage = assetManager.loadedImage["stone"];
        this.brickImage = assetManager.loadedImage["brick"];
        this.switchGreenImage = assetManager.loadedImage["switchGreen"];
        this.switchRedImage = assetManager.loadedImage["switchRed"];
        this.switchBlueImage = assetManager.loadedImage["switchBlue"];
        this.playerImage = assetManager.loadedImage["player"];
        this.slimeImage = assetManager.loadedImage["slime"];
        this.arrowImage = assetManager.loadedImage["arrow"];
        this.bowImage = assetManager.loadedImage["bow"];
        this.heartImage = assetManager.loadedImage["heart"];
        this.crosshairImage = assetManager.loadedImage["crosshair"];
        this.skeletonImage = assetManager.loadedImage["skeleton"];

        for (let i = 0; i < 10; i++) {
            this.numberImages.push(assetManager.loadedImage["hud"+i]);
        }

        this.spawnHandler = new SpawnHandler(this.spawners);
        this.projectileHandler = new ProjectileHandler(this.arrowImage);
        this.trueRandom = new TrueRandom();

    }

    onCreated(): void {
        this.trueRandom.randSeed();
        let size = Calculator.calculateSize(GameScene.TILE_SIZE, Global.getInstance().width , Global.getInstance().height);
        let mc : MapCreator = new MapCreator(size.y, size.x);
        this.maps = mc.getMap();
        this.cursor = new Cursor(<IRectangle>{
            x:0,y:0,width:GameScene.TILE_SIZE/2,height:GameScene.TILE_SIZE/2
        }, this.crosshairImage);
        this.cursor.setZIndex(100000);
        this.addGameObject(this.cursor)

        for (let i = 0; i < this.maps.length; i++) {
            for (let j = 0; j < this.maps[i].length; j++) {
                let img;
                if(this.maps[i][j].char == '#'){
                    img = this.pathImage;
                }
                else if(this.maps[i][j].char == 'W'){
                    img = this.stoneImage;
                    this.obstacles.push(this.maps[i][j]);
                }else if(this.maps[i][j].char == 'S'){
                    img = null;
                    let spawner:Spawner;
                    let num = this.trueRandom.randomNumber(0,2);
                    if(num==0){
                        spawner = new Spawner(<IRectangle>{
                            x: i*GameScene.TILE_SIZE,
                            y: j*GameScene.TILE_SIZE,
                            width: GameScene.TILE_SIZE,
                            height: GameScene.TILE_SIZE
                        }, this.switchGreenImage, this.slimeImage);

                    }else{
                        spawner = new SkeletonSpawner(<IRectangle>{
                            x: i*GameScene.TILE_SIZE,
                            y: j*GameScene.TILE_SIZE,
                            width: GameScene.TILE_SIZE,
                            height: GameScene.TILE_SIZE
                        }, this.switchRedImage, this.skeletonImage);
                    }

                    spawner.setZIndex(10);
                    this.spawners.push(spawner);
                    this.addGameObject(spawner);

                }else if(this.maps[i][j].char == 'H'){
                    img = this.pathImage;
                    this.player = new Player(<IRectangle>{
                        x: i*GameScene.TILE_SIZE,
                        y: j*GameScene.TILE_SIZE,
                        width: GameScene.TILE_SIZE,
                        height: GameScene.TILE_SIZE
                    }, this.playerImage, this.bowImage);
                    this.player.setZIndex(10);
                    this.player.setTile(j, i);
                    this.addGameObject(this.player);
                }else{
                    img = this.brickImage;
                    this.obstacles.push(this.maps[i][j]);
                }

               this.addGameObject(new GameTile(<IRectangle>{
                    x: i*GameScene.TILE_SIZE,
                    y: j*GameScene.TILE_SIZE,
                    width: GameScene.TILE_SIZE,
                    height: GameScene.TILE_SIZE
                }, img));
            }
        }

        this.gameMenu = new GameMenu(
            <IRectangle>{
                x: 0,
                y: 0,
                width: Global.getInstance().width,
                height: this.maps[0].length * GameScene.TILE_SIZE
            }, this.heartImage, this.numberImages
        );

        this.addGameObject(this.gameMenu);

    }

    onRender(ctx: CanvasRenderingContext2D): void {
    }

    onUpdate(): void {
        if(this.mouseHold){
            let p: Point = this.player.getMiddlePoint();
            let vel = Calculator.calculateVelocity(p, this.player.mousePoint);
            let projectile = this.projectileHandler.createProjectile(p.x, p.y, vel.x, vel.y, SceneEngine.getInstance().deltaTime());
            if(projectile != null){
                this.projectiles.push(projectile);
            }
        }else{
            this.projectileHandler.update(SceneEngine.getInstance().deltaTime());
        }

        let enemy = this.spawnHandler.update(SceneEngine.getInstance().deltaTime());
        if(enemy){
            this.enemies.push(enemy);
            this.addGameObject(enemy);
        }

        for (let enemy of this.enemies) {
            enemy.pathFind(this.maps, Math.round(this.player.x/GameScene.TILE_SIZE),Math.round(this.player.y/GameScene.TILE_SIZE));
        }

        if((this.nextVelX != 0 || this.nextVelY != 0) && this.isCanWalk(
            new RectangleGameObject(<IRectangle>{
                x:this.player.x+this.nextVelX, y:this.player.y+this.nextVelY, width:this.player.width, height:this.player.height
            }))
        ){
            this.player.velX = this.nextVelX;
            this.player.velY = this.nextVelY;
            this.nextVelX = 0;
            this.nextVelY = 0;
        }

        for (const projectile of this.projectiles) {
            for (const enemy of this.enemies) {
                if(projectile.isCollide(enemy)){
                    projectile.onHit(enemy);
                }
            }
        }

        for (const enemy of this.enemies) {
            if(this.player.isCollide(enemy)){
                this.gameMenu.reduceHeart();
                enemy.destroy();
            }
        }

        for (const wall of this.obstacles) {
            let obs = new RectangleGameObject(<IRectangle>{
                x: wall.x * GameScene.TILE_SIZE,
                y: wall.y * GameScene.TILE_SIZE,
                width: GameScene.TILE_SIZE,
                height: GameScene.TILE_SIZE
            });
            if(this.player.isIntersectSoft(obs)){
                let dx1 = Math.abs(this.player.x - (obs.x + GameScene.TILE_SIZE));
                let dx2 = Math.abs((this.player.x + this.player.width) - obs.x);
                let dx = Math.min(dx1, dx2);

                let dy1 = Math.abs(this.player.y - (obs.y + GameScene.TILE_SIZE));
                let dy2 = Math.abs((this.player.y + this.player.height) - obs.y);
                let dy = Math.min(dy1, dy2);

                if (dx < dy) {
                    if (dx == dx1) {
                        this.player.x = this.player.x + dx;
                    }
                    else {
                        this.player.x = this.player.x - dx;
                    }
                }
                else if (dy < dx) {
                    if (dy == dy1) {
                        this.player.y = this.player.y + dy;
                    }
                    else {
                        this.player.y = this.player.y - dy;
                    }
                }
            }


        }

    }

    mouseUp(e: MouseEvent) {
        this.mouseHold = false;
    }

    mouseDown(e: MouseEvent) {
        this.mouseHold = true;
    }

    noticeDelete(gameObject: GameObject) {
        super.noticeDelete(gameObject);
        if(gameObject instanceof Enemy){
            this.enemies.splice(this.enemies.indexOf(gameObject) , 1);
            this.gameMenu.setScore(this.gameMenu.score+1);
        }else if(gameObject instanceof Projectile){
            this.projectiles.splice(this.projectiles.indexOf(gameObject) , 1);
        }

    }

    mouseMove(e: MouseEvent) {
        this.player.setMousePoint(new Point(e.x, e.y));
        this.cursor.setMiddlePoint(new Point(e.x, e.y))
    }

    keyDown(e: KeyboardEvent) {
        switch(e.key){
            case 'e':
                this.player.velX = 0;
                this.player.velY = 0;
                this.nextVelX = 0;
                this.nextVelY = 0;
                break;
            case 'w':
                if(!this.isCanWalk(new RectangleGameObject(<IRectangle>{
                    x:this.player.x, y:this.player.y-1, width:this.player.width, height:this.player.height
                }))){
                    this.nextVelX = 0;
                    this.nextVelY = -1;
                }else{
                    this.player.velX = 0;
                    this.player.velY = -1;
                    this.nextVelX = 0;
                    this.nextVelY = 0;
                }
                break;
            case 'a':
                if(!this.isCanWalk(new RectangleGameObject(<IRectangle>{
                    x:this.player.x-1, y:this.player.y, width:this.player.width, height:this.player.height
                }))){
                    this.nextVelX = -1;
                    this.nextVelY = 0;
                }else{
                    this.player.velX=-1;
                    this.player.velY=0;
                    this.nextVelX = 0;
                    this.nextVelY = 0;
                }
                break;
            case 's':
                if(!this.isCanWalk(new RectangleGameObject(<IRectangle>{
                    x:this.player.x, y:this.player.y+1, width:this.player.width, height:this.player.height
                }))){
                    this.nextVelX = 0;
                    this.nextVelY = 1;
                }else{
                    this.player.velX = 0;
                    this.player.velY = 1;
                    this.nextVelX = 0;
                    this.nextVelY = 0;
                }
                break;
            case 'd':
                if(!this.isCanWalk(new RectangleGameObject(<IRectangle>{
                    x:this.player.x+1, y:this.player.y, width:this.player.width, height:this.player.height
                }))){
                    this.nextVelX = 1;
                    this.nextVelY = 0;
                }else{
                    this.player.velX=1;
                    this.player.velY=0;
                    this.nextVelX = 0;
                    this.nextVelY = 0;
                }
                break;
        }
    }

    isCanWalk(g: GameObject) : boolean{
        for (const wall of this.obstacles) {
            let obs = new RectangleGameObject(<IRectangle>{
                x: wall.x * GameScene.TILE_SIZE,
                y: wall.y * GameScene.TILE_SIZE,
                width: GameScene.TILE_SIZE,
                height: GameScene.TILE_SIZE
            });
            if(obs.isIntersectSoft(g)){
                return false;
            }
        }
        return true;
    }

}