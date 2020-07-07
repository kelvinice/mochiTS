import Scene from '../../../module/context/core/scene/scene';
import AssetManager from '../../../module/context/generals/asset';
import MapCreator from '../../handlers/mapCreator';
import { IRectangle } from '../../../module/context/core/gameObjects/gameObject';
import Tile from '../model/tiles/tile';
import GameTile from '../model/tiles/gameTile';
import Player from "../model/player";
import Point from "../model/point";
import Projectile from "../model/projectile";
import {splitSprite} from "../../handlers/imageHandler";
import Enemy from "../model/enemies/enemy";
import Slime from "../model/enemies/slime";

export default class GameScene extends Scene{
    pathImage: ImageBitmap;
    stoneImage: ImageBitmap;
    brickImage: ImageBitmap;
    switchGreenImage: ImageBitmap;
    playerImage: ImageBitmap;
    slimeImage: ImageBitmap
    public static TILE_SIZE: number = 40;
    player: Player;
    enemies: Enemy[];
    maps: Tile[][];


    constructor(assetManager: AssetManager){
        super();
        this.pathImage = assetManager.loadedImage["path"];
        this.stoneImage = assetManager.loadedImage["stone"];
        this.brickImage = assetManager.loadedImage["brick"];
        this.switchGreenImage = assetManager.loadedImage["switchGreen"];
        this.playerImage = assetManager.loadedImage["player"];
        this.slimeImage = assetManager.loadedImage["slime"];
        this.enemies = [];
    }


    isOne = true;
    onCreated(): void {
        let mc :MapCreator = new MapCreator(16,25);
        this.maps = mc.getMap();

        for (let i = 0; i < this.maps.length; i++) {
            for (let j = 0; j < this.maps[i].length; j++) {
                let img;
                if(this.maps[i][j].char == '#'){
                    img = this.pathImage;
                }
                else if(this.maps[i][j].char == 'W'){
                    img = this.stoneImage;
                }else if(this.maps[i][j].char == 'S'){
                    img = this.switchGreenImage;

                    let enemy = new Slime(<IRectangle>{
                        x: i*GameScene.TILE_SIZE,
                        y: j*GameScene.TILE_SIZE,
                        width: GameScene.TILE_SIZE,
                        height: GameScene.TILE_SIZE
                    }, this.slimeImage);
                    enemy.setZIndex(15);
                    this.enemies.push(enemy);
                    this.addGameObject(enemy);


                }else if(this.maps[i][j].char == 'H'){
                    img = this.pathImage;
                    this.player = new Player(<IRectangle>{
                        x: i*GameScene.TILE_SIZE,
                        y: j*GameScene.TILE_SIZE,
                        width: GameScene.TILE_SIZE,
                        height: GameScene.TILE_SIZE
                    }, this.playerImage);
                    this.player.setZIndex(10);
                    this.player.setTile(j, i);
                    this.addGameObject(this.player);
                }else{
                    img = this.brickImage;
                }

               this.addGameObject(new GameTile(<IRectangle>{
                    x: i*GameScene.TILE_SIZE,
                    y: j*GameScene.TILE_SIZE,
                    width: GameScene.TILE_SIZE,
                    height: GameScene.TILE_SIZE
                }, img));
            }
            
        }

    }
    onRender(ctx: CanvasRenderingContext2D): void {
       
    }
    onUpdate(): void {
        for (let enemy of this.enemies) {
            enemy.pathFind(this.maps, this.player.tileY, this.player.tileX);
        }
        
    }

    mouseClick(e:MouseEvent){
        let p: Point = this.player.getMiddlePoint();

        let xDif = e.x - p.x;
        let yDif = e.y - p.y;
        let dif = Math.abs(xDif)+ Math.abs(yDif);
        let maxVel= 2;

        let xVel = xDif/dif * maxVel;
        let yVel = yDif/dif * maxVel;

        let projectile = new Projectile(<IRectangle>{
            x: p.x,
            y: p.y,
            width: 20,
            height: 20
        }, new Point(xVel, yVel))
            .setSpeed(3)
            .setZIndex(20)
            .setMiddlePoint(p);
        this.addGameObject(projectile);
    }
    

}