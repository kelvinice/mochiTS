import SceneEngine from "./module/context/core/scene/sceneEngine";
import MenuScene from "./script/game/scenes/MenuScene";
import DummyScene from './script/game/scenes/dummy-scene';

window.onload = () =>{
    	function init() {
                let canvas: HTMLCanvasElement= document.getElementsByTagName("canvas")[0];
                
                let sceneEngine = SceneEngine.getInstance();
                sceneEngine.initCanvas(canvas);
                sceneEngine.makeWindowReactive();
                
                sceneEngine.updateScene(new DummyScene());
                sceneEngine.start();
        }
        init();

}