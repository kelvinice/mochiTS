import SceneEngine from "./module/context/core/sceneEngine";
import DummyScene from './script/game/scenes/dummyScene';
import MapCreator from './script/handler/mapCreator';
import GameScene from './script/game/scenes/gameScene';
import AssetManager from './module/context/general/asset';

window.onload = () =>{
    	function init() {
        var canv: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        var sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canv);
        
        
        let assetManager: AssetManager = new AssetManager();
        
        assetManager.addPath("path","path.png");
        assetManager.addPath("stone","stone.png");
        assetManager.addPath("brick","brick.png");
        assetManager.addPath("switchBlue","switchBlue.png");
        assetManager.addPath("switchRed","switchRed.png");
        assetManager.addPath("switchGreen","switchGreen.png");
        assetManager.addPath("player","player_green.png");

        assetManager.addAssetDoneListener(()=>{
                sceneEngine.updateScene(new GameScene(assetManager));
                sceneEngine.start();
        });

        assetManager.loadAsset();

        }
        init();
}