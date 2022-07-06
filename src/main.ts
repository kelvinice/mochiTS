import SceneEngine from "./module/context/core/scene/sceneEngine";
import AssetManager from './module/context/generals/asset';
import Global from "./module/context/generals/global";
import MenuScene from "./script/game/scenes/MenuScene";

window.onload = () =>{
    	function init() {
                let canvas: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
                
                let sceneEngine = SceneEngine.getInstance();
                sceneEngine.initCanvas(canvas);
                sceneEngine.makeWindowReactive();
                let assetManager: AssetManager = Global.getInstance().assetManager;
                
                sceneEngine.updateScene(new MenuScene());
                assetManager.loadAsset();
                sceneEngine.start();
        }
        init();

}