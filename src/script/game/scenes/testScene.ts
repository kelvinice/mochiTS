import Scene from '../../../module/context/core/scene';
import AssetManager from '../../../module/context/general/asset';
import MapCreator from '../../handler/mapCreator';
import GameObject from '../../../module/context/core/gameObject';
import GameTile from '../model/gameTile';
import { IGameObject } from '../../../module/context/core/gameObject';

export default class TestScene extends Scene{
    pathImage;
    TILE_SIZE: number = 80;

    constructor(assetManager: AssetManager){
        super();
        console.log(assetManager.loadedImage["path"]);
        this.pathImage = assetManager.loadedImage["path"];
        
    }

    onCreated(): void {
        let mc :MapCreator = new MapCreator(20,20);
        let map = mc.getMap();
        console.log(map);
        this.addGameObject(new GameTile(<IGameObject>{
            x: 20,
            y: 20,
            width: 80,
            height: 80
        }, this.pathImage));
       
        

    }
    onRender(ctx: CanvasRenderingContext2D): void {
       
    }
    onUpdate(): void {
        
    }

   
    

}