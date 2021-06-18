import SceneEngine from "./module/context/core/scene/sceneEngine";
import AssetManager from './module/context/generals/asset';
import Global from "./module/context/generals/global";
import LoadingScene from "./script/game/scenes/loadingScene";
import PlayScene from "./script/game/scenes/playScene";
import MenuScene from "./script/game/scenes/MenuScene";

window.onload = () =>{
    	function init() {
        let canvas: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        let sceneEngine = SceneEngine.getInstance();
        sceneEngine.initCanvas(canvas);
        sceneEngine.makeWindowReactive();

        let assetManager: AssetManager = Global.getInstance().assetManager;
        
        assetManager.addPath("1","Logo 21-2.png");
        assetManager.addPath("2","Logo 18-1.png");
        assetManager.addPath("3","Logo 18-2.png");
        assetManager.addPath("4","Logo 20-1.png");
        assetManager.addPath("5","Logo 19-1.png");
        assetManager.addPath("6","Logo 17-1.png");
        assetManager.addPath("circuit","circuit.jpg");
        assetManager.addPath("hit","hit.png");
        assetManager.addPath("bluejack","bluejack.png");
		
		console.log("test456");

        // assetManager.addPath("stone","stone.png");
        // assetManager.addPath("brick","brick.png");
        // // assetManager.addPath("switchBlue","switchBlue.png");
        // assetManager.addPath("switchRed","switchRed.png");
        // assetManager.addPath("switchGreen","switchGreen.png");
        // assetManager.addPath("player","player.png");
        // assetManager.addPath("slime","slime.png");
        // assetManager.addPath("arrow","arrow.png");
        // assetManager.addPath("bow","bow.png");
        // assetManager.addPath("heart","hudHeart_full.png");
        // assetManager.addPath("skeleton","skeleton.png");
        // assetManager.addPath("sunStrike","sunStrike.png");
        // assetManager.addPath("hit","hit.png");
        // assetManager.addPath("fireball","fireball.png");
        // assetManager.addPath("background","background.png");
        // assetManager.addPath("boss","boss.png");
        // assetManager.addPath("energy","energy.png");
        // assetManager.addPath("dark-arrow","dark-arrow.png");
        // assetManager.addPath("dark-sunStrike","dark-sunStrike.png");

        for (let i = 0; i < 10; i++) {
                assetManager.addPath("hud"+i,"hud"+i+".png");
        }

        sceneEngine.updateScene(new LoadingScene());
        sceneEngine.start();

        assetManager.addAssetDoneListener(()=>{
                // sceneEngine.updateScene(new GameOverScene(90));
                sceneEngine.updateScene(new MenuScene());
                // sceneEngine.updateScene(new PlayScene());

        });

        assetManager.loadAsset();


        }
        init();

}