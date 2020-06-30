import SceneEngine from "./module/context/core/sceneEngine";
import GameScene from './script/game/gameScene';
import MapCreator from './script/handler/mapCreator';


window.onload = () =>{
    	function init() {
            var canv: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
            
        //     var sceneEngine = SceneEngine.getInstance();
        //     sceneEngine.initCanvas(canv);
        //     sceneEngine.makeWindowReactive();
        //     sceneEngine.updateScene(new GameScene());
        //     sceneEngine.start();
        new MapCreator(20,20);

        }
        init();
}