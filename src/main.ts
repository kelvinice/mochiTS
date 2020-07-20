import SceneEngine from "./module/context/core/scene/sceneEngine";
import GameScene from './script/game/scenes/gameScene';
import AssetManager from './module/context/generals/asset';
import global from "./module/context/generals/global";

window.onload = () =>{
    	function init() {
        let canvas: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        let sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canvas);
        // sceneEngine.makeWindowReactive();
        sceneEngine.hideCursor();

        let assetManager: AssetManager = new AssetManager();
        
        assetManager.addPath("path","path.png");
        assetManager.addPath("stone","stone.png");
        assetManager.addPath("brick","brick.png");
        assetManager.addPath("switchBlue","switchBlue.png");
        assetManager.addPath("switchRed","switchRed.png");
        assetManager.addPath("switchGreen","switchGreen.png");
        assetManager.addPath("player","player.png");
        assetManager.addPath("slime","slime.png");
        assetManager.addPath("arrow","arrow.png");
        assetManager.addPath("bow","bow.png");
        assetManager.addPath("heart","hudHeart_full.png");
        assetManager.addPath("crosshair","crosshair.png");
        assetManager.addPath("skeleton","skeleton.png");
        assetManager.addPath("sunStrike","sunStrike.png");
        assetManager.addPath("hit","hit.png");


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
window.debug = () => {
        global.getInstance().debug = !global.getInstance().debug;
}

