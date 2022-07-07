import Tile from "../game/model/tiles/tile";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import TrueRandom from "./trueRandom";
import Point from "../../module/context/generals/point";
import Global from "../../module/context/generals/global";

export default class PuzzleHandler {
    private trueRandom: TrueRandom;

    constructor() {
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }

    createNewTile(size: number, y: number, x: number, maxTileU: number): Tile{
        let tile = new Tile(this.trueRandom.randomNumber(1,Global.getInstance().maxTileCount), y, x,size);
        return tile;
    }

    checkOn(maps: Tile[][], currentTile: Tile): Point[]{
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
        let changingList: Point[] = [];

        if(horizontalList.length >=3){
            for (let tile of horizontalList) {
                SceneEngine.getInstance().injectDestroyedGameObject(tile);
                changingList = this.getBottomChangingPointList(changingList, new Point(tile.xMap, tile.yMap));
            }

        }
        if(verticalList.length >=3){
            for (let tile of verticalList) {
                SceneEngine.getInstance().injectDestroyedGameObject(tile);
                changingList = this.getBottomChangingPointList(changingList, new Point(tile.xMap, tile.yMap));
            }
        }

        return changingList;
    }
    swapTilePosition(tile1: Tile, tile2: Tile){
        let tempX = tile1.x;
        let tempY = tile1.y;
        tile1.x = tile2.x;
        tile1.y = tile2.y;
        tile2.x = tempX;
        tile2.y = tempY;
    }

    getBottomChangingPointList(list: Point[], point: Point): Point[]{
        let currTile = list.find((p)=> p.x == point.x);
        if(currTile == null){
            list.push(point);
        }else{
            currTile.y = Math.max(currTile.y, point.y);
        }
        return list;
    }


}