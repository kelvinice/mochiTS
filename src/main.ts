import SceneEngine from "./module/context/core/scene/sceneEngine";
import GameScene from './script/game/scenes/gameScene';
import AssetManager from './module/context/generals/asset';

window.onload = () =>{
    	function init() {
        var canv: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        var sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canv);
        // sceneEngine.makeWindowReactive();
        sceneEngine.hideCursor();
        
        
        let assetManager: AssetManager = new AssetManager();
        
        assetManager.addPath("path","path.png");
        assetManager.addPath("stone","stone.png");
        assetManager.addPath("brick","brick.png");
        assetManager.addPath("switchBlue","switchBlue.png");
        assetManager.addPath("switchRed","switchRed.png");
        assetManager.addPath("switchGreen","switchGreen.png");
        assetManager.addPath("player","player_green.png");
        assetManager.addPath("slime","slime.png");
        assetManager.addPath("arrow","arrow.png");
        assetManager.addPath("bow","bow.png");
        assetManager.addPath("heart","hudHeart_full.png");
        assetManager.addPath("crosshair","crosshair.png");
        assetManager.addPath("skeleton","skeleton.png");

        for (let i = 0; i < 10; i++) {
                assetManager.addPath("hud"+i,"hud"+i+".png");
        }

        assetManager.addAssetDoneListener(()=>{
                sceneEngine.updateScene(new GameScene(assetManager));
                sceneEngine.start();
        });

        assetManager.loadAsset();

        }
        init();
}