import Scene from '../../../module/context/core/scene';
import AssetManager from '../../../module/context/general/asset';
import MapCreator from '../../handler/mapCreator';
import GameTile from '../model/gameTile';
import { IGameObject } from '../../../module/context/core/gameObject';
import Tile from '../model/tile';

export default class TestScene extends Scene{
    pathImage: ImageBitmap;
    stoneImage: ImageBitmap;
    brickImage: ImageBitmap;
    switchGreenImage: ImageBitmap;
    playerImage: ImageBitmap;
    TILE_SIZE: number = 60;

    constructor(assetManager: AssetManager){
        super();
        this.pathImage = assetManager.loadedImage["path"];
        this.stoneImage = assetManager.loadedImage["stone"];
        this.brickImage = assetManager.loadedImage["brick"];
        this.switchGreenImage = assetManager.loadedImage["switchGreen"];
        this.playerImage = assetManager.loadedImage["player"];
    }

    onCreated(): void {
        let mc :MapCreator = new MapCreator(16,25);
        let map: Tile[][] = mc.getMap();

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
                }else if(map[i][j].char == 'H'){
                    img = this.playerImage;
                }else{
                    img = this.brickImage;
                }

               this.addGameObject(new GameTile(<IGameObject>{
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

    mouseClick(e:Event){
        console.log(e);
    }
    

}