import SceneEngine from "./module/context/core/scene/sceneEngine";
import AssetManager from './module/context/generals/asset';
import Global from "./module/context/generals/global";
import MenuScene from "./script/game/scenes/menuScene";
import GameOverScene from "./script/game/scenes/gameOverScene";

window.onload = () =>{
    	function init() {
        let canvas: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        let sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canvas);
        sceneEngine.makeWindowReactive();

        let assetManager: AssetManager = Global.getInstance().assetManager;
        
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
        assetManager.addPath("fireball","fireball.png");
        assetManager.addPath("background","background.png");
        assetManager.addPath("boss","boss.png");
        assetManager.addPath("energy","energy.png");
        assetManager.addPath("dark-arrow","dark-arrow.png");
        assetManager.addPath("dark-sunStrike","dark-sunStrike.png");

        for (let i = 0; i < 10; i++) {
                assetManager.addPath("hud"+i,"hud"+i+".png");
        }

        assetManager.addAssetDoneListener(()=>{
                // sceneEngine.updateScene(new GameOverScene(90));
                sceneEngine.updateScene(new MenuScene());
                // sceneEngine.updateScene(new GameScene());
                sceneEngine.start();
        });

        assetManager.loadAsset();

        }
        init();

}