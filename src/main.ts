import SceneEngine from "./module/context/core/sceneEngine";
import GameScene from './module/game/gameScene';

window.onload = () =>{
    	function init() {
            let canv: HTMLCanvasElement;
            canv = document.getElementsByTagName("canvas")[0];
            
            let sceneEngine = SceneEngine.getInstance();
            sceneEngine.initCanvas(canv);
        //     sceneEngine.makeWindowReactive();
            SceneEngine.getInstance().updateScene(new GameScene());
            sceneEngine.start();
        }
        init();
}