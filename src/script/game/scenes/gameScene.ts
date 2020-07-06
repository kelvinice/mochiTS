import Scene from '../../../module/context/core/scene/scene';
import AssetManager from '../../../module/context/general/asset';
import MapCreator from '../../handler/mapCreator';
import { IRectangle } from '../../../module/context/core/gameObject/gameObject';
import Tile from '../model/tile/tile';
import GameTile from '../model/tile/gameTile';
import Player from "../model/player";
import Point from "../model/point";
import Projectile from "../model/projectile";
import {splitSprite} from "../../handler/imageHandler";
import Enemy from "../model/enemy";

export default class GameScene extends Scene{
    pathImage: ImageBitmap;
    stoneImage: ImageBitmap;
    brickImage: ImageBitmap;
    switchGreenImage: ImageBitmap;
    playerImage: ImageBitmap;
    slimeImage: ImageBitmap
    TILE_SIZE: number = 40;
    player: Player;

    constructor(assetManager: AssetManager){
        super();
        this.pathImage = assetManager.loadedImage["path"];
        this.stoneImage = assetManager.loadedImage["stone"];
        this.brickImage = assetManager.loadedImage["brick"];
        this.switchGreenImage = assetManager.loadedImage["switchGreen"];
        this.playerImage = assetManager.loadedImage["player"];
        this.slimeImage = assetManager.loadedImage["slime"];
    }

    onCreated(): void {
        let mc :MapCreator = new MapCreator(16,25);
        let map: Tile[][] = mc.getMap();
        let slimes = splitSprite(this.slimeImage, 4, 4);

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                let img;
                if(map[i][j].char == '#'){
                    img = this.pathImage;
                }
                else if(map[i][j].char == 'W'){
                    img = this.stoneImage;
                }else if(map[i][j].char == 'S'){
                    img = this.switchGreenImage;
                    // let enemy = new Enemy()

                }else if(map[i][j].char == 'H'){
                    img = this.pathImage;
                    this.player = new Player(<IRectangle>{
                        x: i*this.TILE_SIZE,
                        y: j*this.TILE_SIZE,
                        width: this.TILE_SIZE,
                        height: this.TILE_SIZE
                    }, this.playerImage);
                    this.player.setZIndex(10);
                    this.addGameObject(this.player);
                }else{
                    img = this.brickImage;
                }

               this.addGameObject(new GameTile(<IRectangle>{
                    x: i*this.TILE_SIZE,
                    y: j*this.TILE_SIZE,
                    width: this.TILE_SIZE,
                    height: this.TILE_SIZE
                }, img));
            }
            
        }

    }
    onRender(ctx: CanvasRenderingContext2D): void {
       
    }
    onUpdate(): void {
        
    }

    mouseClick(e:MouseEvent){
        let p: Point = this.player.getMiddlePoint();

        let xDif = e.x - p.x;
        let yDif = e.y - p.y;
        let dif = Math.abs(xDif)+ Math.abs(yDif);
        let maxVel= 2;

        let xVel = xDif/dif * maxVel;
        let yVel = yDif/dif * maxVel;
        console.log("X Vel: "+xVel);
        console.log("Y Vel: "+yVel);

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