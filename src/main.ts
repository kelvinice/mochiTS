import SceneEngine from "./module/context/core/sceneEngine";
import GameScene from './script/game/scenes/gameScene';
import MapCreator from './script/handler/mapCreator';
import TestScene from './script/game/scenes/testScene';
import AssetManager from './module/context/general/asset';

window.onload = () =>{
    	function init() {
        var canv: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        var sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canv);
        // sceneEngine.makeWindowReactive();
        

        let assetManager: AssetManager = new AssetManager();
        

        assetManager.addPath("path","path.png");
        assetManager.addAssetDoneListener(()=>{
                sceneEngine.updateScene(new TestScene(assetManager));
                sceneEngine.start();
        });

        assetManager.loadAsset();

        
        // 

        }
        init();
}