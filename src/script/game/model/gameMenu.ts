import GameObject, {IRectangle} from "../../../module/context/core/gameObjects/gameObject";
import Heart from "./huds/heart";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import NumberHUD from "./huds/numberHUD";
import Global from "../../../module/context/generals/global";
import GameOverScene from "../scenes/gameOverScene";

export default class GameMenu extends GameObject{
    heartImage:ImageBitmap;
    heartYPosition: number;
    numberYPosition: number;
    score: number;

    hearts: Heart[];

    hp: number;
    numbers: NumberHUD[];
    digit = 3;
    bgm: HTMLAudioElement;

    constructor(iGameObject: IRectangle, bgm: HTMLAudioElement) {
        super(iGameObject);
        this.setZIndex(1000);
        this.bgm = bgm;

        this.hearts = [];
        this.numbers = [];
        this.heartImage = Global.getInstance().assetManager.loadedImage["heart"];
        this.heartYPosition = 0;
        this.numberYPosition = 0;
        let heartSize = 80;
        this.hp = 3;
        this.score = 0;

        for(let i=0;i<this.hp +2;i++){
            let heart = new Heart(<IRectangle>{
               x: this.width - (heartSize * (i + 1)),
                y: this.heartYPosition,
                width: heartSize,
                height: heartSize
            }, this.heartImage);
            heart.setZIndex(this.zIndex + 1);
            this.hearts.push(heart);
            if(i< this.hp){
                SceneEngine.getInstance().injectGameObject(heart);
            }
        }

        let numberSize = 80;

        for (let i = 0; i < this.digit; i++) {
            let number = new NumberHUD(<IRectangle>{
                x:this.x+(numberSize * i),
                y: this.numberYPosition,
                width: numberSize,
                height: numberSize
            });
            this.numbers[i] = number;
            number.setZIndex(this.zIndex+1);
            SceneEngine.getInstance().injectGameObject(number);
        }

    }

    draw(ctx: CanvasRenderingContext2D, time: Number): void {
    }

    update(): void {
    }

    public reduceHeart(){
        let audio = new Audio("assets/sounds/attacked.mp3");
        audio.play();

        this.hp--;
        this.hearts[this.hp].destroy();
        this.hearts[this.hp]
        if(this.hp<=0){
            this.bgm.pause();
            SceneEngine.getInstance().showCursor();
            SceneEngine.getInstance().updateScene(new GameOverScene(this.score));
            return;
        }
    }

    public increaseHeart(){
        this.hearts[this.hp].restore();
        SceneEngine.getInstance().injectGameObject(this.hearts[this.hp]);
        this.hp++;
    }

    public setScore(number: number){
        let pad = "";
        for (let i = 0; i < this.digit-1; i++) {
            pad+="0";
        }
        let score = (pad + number).slice(-1 * this.digit);
        this.score = number;
        for(let i=0;i<score.length;i++){
            this.numbers[i].setNumber(+score[i]);
        }

    }
}

export function padString(number: number, digit: number): string {
    let pad = "";
    for (let i = 0; i < digit-1; i++) {
        pad+="0";
    }
    return (pad + number).slice(-1 * this.digit);
}