import Scene from "../../../module/context/core/scene/scene";
import MapCreator from "../../handlers/mapCreator";
import Tile from "../model/tiles/tile";

export default class PlayScene extends Scene{
    maps: Tile[][];

    onCreated(): void {
        let mapCreator: MapCreator= new MapCreator(10,10);
        this.maps = mapCreator.getMapRandomized();
        mapCreator.print(this.maps);
        for (let i = 0; i < this.maps.length; i++)
        {
            for (let j = 0; j < this.maps[i].length; j++)
            {
                this.addGameObject(this.maps[i][j]);
            }
        }
    }

    onRender(ctx: CanvasRenderingContext2D): void {



    }

    onUpdate(): void {
    }

}