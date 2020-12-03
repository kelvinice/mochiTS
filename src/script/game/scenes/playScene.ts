import Scene from "../../../module/context/core/scene/scene";
import mapCreator from "../../handlers/mapCreator";
import MapCreator from "../../handlers/mapCreator";

export default class PlayScene extends Scene{
    onCreated(): void {
        let mapCreator: MapCreator= new MapCreator(10,10);
        let maps = mapCreator.getMapRandomized();
        mapCreator.print(maps);

    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.fillRect(0,0,100,100);
    }

    onUpdate(): void {
    }

}