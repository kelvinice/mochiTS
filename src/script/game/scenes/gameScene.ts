import Scene from '../../../module/context/core/scene/scene';
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
import SunStrike from "../model/skills/sunStrike";
import SlimeSpawner from "../model/enemies/slimeSpawner";
import GameText from "../model/gameText";
import TimeCounter from "../../handlers/timeCounter";
import Boss from "../model/enemies/boss";
import GameOverScene from "./gameOverScene";

export default class GameScene extends Scene{
    public static TILE_SIZE: number = 60;

    maps: Tile[][];

    cursor: Cursor;
    player: Player;
    enemies: Enemy[];
    projectiles: Projectile[];
    gameMenu: GameMenu;
    obstacles: Tile[];
    sunStrikes: SunStrike[];

    public static spawnHandler: SpawnHandler;
    projectileHandler: ProjectileHandler;

    nextVelX = 0;
    nextVelY = 0;

    mouseHold: boolean = false;
    trueRandom: TrueRandom;
    fpsText: GameText;
    fpsTimeCounter: TimeCounter;
    fpss: number[] = [];
    audio: HTMLAudioElement;
    boss: Boss;

    constructor(){
        super();
        this.enemies = [];
        this.projectiles = [];
        this.obstacles = [];
        this.sunStrikes = [];

        this.projectileHandler = new ProjectileHandler();
        this.trueRandom = new TrueRandom();
        this.fpsText = new GameText(new Point(Global.getInstance().width/2, GameScene.TILE_SIZE),
            "");

        this.fpsTimeCounter = new TimeCounter(1000);
        GameScene.TILE_SIZE = Global.getInstance().tile_size;
        this.audio = new Audio("assets/sounds/bgm.mp3");
        this.audio.loop = true;
        this.audio.play();
    }

    onCreated(): void {
        this.trueRandom.randSeed();
        let size = Calculator.calculateSize(GameScene.TILE_SIZE, Global.getInstance().width , Global.getInstance().height);
        let mc : MapCreator = new MapCreator(size.y, size.x);
        this.maps = mc.getMap();
        this.cursor = new Cursor(<IRectangle>{
            x:0,y:0,width:GameScene.TILE_SIZE/2,height:GameScene.TILE_SIZE/2
        });
        this.cursor.setZIndex(100000);
        this.addGameObject(this.cursor)
        SceneEngine.getInstance().hideCursor();
        let spawners = [];

        this.gameMenu = new GameMenu(
            <IRectangle>{
                x: 0,
                y: 0,
                width: Global.getInstance().width,
                height: this.maps[0].length * GameScene.TILE_SIZE
            }, this.audio
        );

        this.addGameObject(this.gameMenu);

        for (let i = 0; i < this.maps.length; i++) {
            for (let j = 0; j < this.maps[i].length; j++) {
                let img;
                if(this.maps[i][j].char == '#'){
                    img = Global.getInstance().assetManager.loadedImage["path"];
                }
                else if(this.maps[i][j].char == 'W'){
                    img = Global.getInstance().assetManager.loadedImage["stone"];
                    this.obstacles.push(this.maps[i][j]);
                }else if(this.maps[i][j].char == 'S'){
                    img = null;
                    let spawner:Spawner;
                    let num = this.trueRandom.randomNumber(0,2);
                    if(num==0){
                        spawner = new SlimeSpawner(<IRectangle>{
                            x: i*GameScene.TILE_SIZE,
                            y: j*GameScene.TILE_SIZE,
                            width: GameScene.TILE_SIZE,
                            height: GameScene.TILE_SIZE
                        });
                    }else{
                        spawner = new SkeletonSpawner(<IRectangle>{
                            x: i*GameScene.TILE_SIZE,
                            y: j*GameScene.TILE_SIZE,
                            width: GameScene.TILE_SIZE,
                            height: GameScene.TILE_SIZE
                        });
                    }

                    spawner.setZIndex(10);
                    spawners.push(spawner);
                    this.addGameObject(spawner);

                }else if(this.maps[i][j].char == 'H'){
                    img = Global.getInstance().assetManager.loadedImage["path"];
                    this.player = new Player(<IRectangle>{
                        x: i*GameScene.TILE_SIZE,
                        y: j*GameScene.TILE_SIZE,
                        width: GameScene.TILE_SIZE,
                        height: GameScene.TILE_SIZE
                    }, this.gameMenu);
                    this.player.setTile(j, i);
                    this.addGameObject(this.player);
                }else{
                    img = Global.getInstance().assetManager.loadedImage["brick"];
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


        this.fpsText.setFontSize(GameScene.TILE_SIZE);
        this.addGameObject(this.fpsText);
        GameScene.spawnHandler = new SpawnHandler(spawners);

        GameScene.spawnHandler.changeAllSpawner();

        this.boss = new Boss({
            x: 100,
            y: 100,
            width: GameScene.TILE_SIZE*2,
            height: GameScene.TILE_SIZE*2,
        }, this.player);

        this.addGameObject(this.boss);
        this.enemies.push(this.boss);
    }

    onRender(ctx: CanvasRenderingContext2D): void {
    }

    onUpdate(): void {
        if(Global.getInstance().debug){
            this.fpss.push(Math.round(SceneEngine.getInstance().getFPSRealization()));
            if(this.fpsTimeCounter.updateTimeCounter(SceneEngine.getInstance().deltaTimeMili())){
                let length = this.fpss.length;
                let total = 0;
                for (const f of this.fpss) {
                    total+= f;
                }

                this.fpsText.setText(Math.round(total/length) + "");
                this.fpss = [];
            }
        }

        //create projectile
        if(this.mouseHold){
            let p: Point = this.player.getMiddlePoint();
            let vel = Calculator.calculateVelocity(p, this.player.mousePoint);
            let projectile = this.projectileHandler.createProjectile(p.x, p.y, vel.x, vel.y, SceneEngine.getInstance().deltaTime());
            if(projectile != null){
                this.projectiles.push(projectile);
            }
        }else{
            this.projectileHandler.addFireTime(SceneEngine.getInstance().deltaTime());
        }

        //Enemy spawn
        let enemy = GameScene.spawnHandler.update(SceneEngine.getInstance().deltaTime());
        if(enemy){
            this.enemies.push(enemy);
            this.addGameObject(enemy);
        }

        //Enemy pathfinding
        for (let enemy of this.enemies) {
            enemy.pathFind(this.maps, Math.round(this.player.x/GameScene.TILE_SIZE),Math.round(this.player.y/GameScene.TILE_SIZE));
        }

        //Check if player prepared next move is available to move
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

        //Check collision pojectile - enemy
        for (const projectile of this.projectiles) {
            for (const enemy of this.enemies) {
                if(projectile.isCollide(enemy)){
                    projectile.onHit(enemy);
                }
            }
        }

        //Check collision sunstrike - enemy
        for (const sunStrike of this.sunStrikes) {
            if(!sunStrike.willDmg)continue;
            for (const enemy of this.enemies) {
                if(sunStrike.isCollide(enemy)){
                    sunStrike.onHit(enemy);
                }
            }
        }

        //Check collision enemy - player
        for (const enemy of this.enemies) {
            if(this.player.isCollide(enemy)){
                this.player.onHitWithEnemy();
                enemy.onHitWithPlayer();
            }
        }

        //Check collision wall - player
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
        if(e.button == 0) {
            this.mouseHold = false;
        }
        else if(e.button == 2){
            if(this.player.useSkill()){
                let ss = new SunStrike(<IRectangle>{
                    x: e.x- (GameScene.TILE_SIZE/2),
                    y: e.y- (GameScene.TILE_SIZE/2),
                    width: GameScene.TILE_SIZE,
                    height: GameScene.TILE_SIZE
                });

                this.sunStrikes.push(ss);
                this.addGameObject(ss);
            }
        }
    }

    mouseDown(e: MouseEvent) {
        if(e.button == 0){
            this.mouseHold = true;
        }
    }

    noticeDelete(gameObject: GameObject) {
        super.noticeDelete(gameObject);
        if(gameObject instanceof Enemy){
            if(gameObject instanceof Boss){
                SceneEngine.getInstance().updateScene(new GameOverScene(this.gameMenu.score));
            }
            this.enemies.splice(this.enemies.indexOf(gameObject) , 1);
            if(gameObject.hp <= 0){
                this.gameMenu.setScore(this.gameMenu.score+1);
                this.player.addExort();
            }
        }else if(gameObject instanceof Projectile){
            this.projectiles.splice(this.projectiles.indexOf(gameObject) , 1);
        }else if(gameObject instanceof SunStrike){
            this.sunStrikes.splice(this.sunStrikes.indexOf(gameObject) , 1);
        }
    }

    mouseMove(e: MouseEvent) {
        this.player.setMousePoint(new Point(e.x, e.y));
        this.cursor.setMiddlePoint(new Point(e.x, e.y))
    }

    keyDown(e: KeyboardEvent) {
        switch(e.key.toLowerCase()){
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