import Tile from "../game/model/tiles/tile";
import SceneEngine from "../../module/context/core/scene/sceneEngine";

export default class PuzzleHandler {
    constructor() {}

    checkOn(maps: Tile[][], currentTile: Tile){
        let leftMost = currentTile;
        let horizontalList: Tile[] = [];
        let topMost = currentTile;
        let verticalList: Tile[] = [];

        while(maps[leftMost.xMap-1][leftMost.yMap].point === leftMost.point){
            leftMost = maps[leftMost.xMap-1][leftMost.yMap];
        }
        // console.log(leftMost)
        horizontalList.push(leftMost);
        while (maps[leftMost.xMap+1][leftMost.yMap].point === leftMost.point){
            leftMost = maps[leftMost.xMap+1][leftMost.yMap];
            horizontalList.push(leftMost);
        }

        while(maps[topMost.xMap][topMost.yMap-1].point === topMost.point){
            topMost = maps[topMost.xMap][topMost.yMap-1];
        }
        verticalList.push(topMost);
        while (maps[topMost.xMap][topMost.yMap+1].point === topMost.point){
            topMost = maps[topMost.xMap][topMost.yMap+1];
            verticalList.push(topMost);
        }

        if(horizontalList.length >=3){
            for (let tile of horizontalList) {
                SceneEngine.getInstance().injectDestroyedGameObject(tile);
            }
        }
        if(verticalList.length >=3){
            for (let tile of verticalList) {
                SceneEngine.getInstance().injectDestroyedGameObject(tile);
            }
        }


    }


}