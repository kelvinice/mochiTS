import Scene from "../../../module/context/core/scene/scene";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import global from "../../../module/context/generals/global";
import Global from "../../../module/context/generals/global";

export default class GameOverScene extends Scene{
    audio: HTMLAudioElement;
    scores: ScoreName[];
    

    onCreated(): void {
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(global.getInstance().assetManager.loadedImage["background"],
            0,0,
            SceneEngine.getInstance().canvas.width,
            SceneEngine.getInstance().canvas.height
        )
        
    }

    onUpdate(): void {
    }


    constructor(score: number) {
        super();
        this.audio = new Audio("assets/sounds/lose.mp3");
        this.audio.loop = true;
        this.audio.play();

        this.scores = [];
        this.scores.push(new ScoreName("RY", 34));
        this.scores.push(new ScoreName("KF", 36));
        this.scores.push(new ScoreName("KE", 37));
        this.scores.push(new ScoreName("JN", 43));
        this.scores.push(new ScoreName("KY", 45));
        this.scores.push(new ScoreName("GB", 55));
        this.scores.push(new ScoreName("DL", 56));
        this.scores.push(new ScoreName("LV", 58));
        this.scores.push(new ScoreName("HY", 59));
        this.scores.push(new ScoreName("KS", 69));
        this.scores.push(new ScoreName("AW", 72));
        this.scores.push(new ScoreName("CL", 76));
        this.scores.push(new ScoreName("GN", 80));
        this.scores.push(new ScoreName("AM", 84));
        this.scores.push(new ScoreName("RS", 90));
        this.scores.push(new ScoreName("AP", 97));
        this.scores.push(new ScoreName("RL", 107));
        this.scores.push(new ScoreName("LW", 142));
        this.scores.push(new ScoreName("DD", 143));
        this.scores.push(new ScoreName(Global.getInstance().name.toUpperCase(), score));

        this.scores.sort((a,b)=>{
            return (+b.score) - (+a.score);
        })


        let table = document.getElementById("score-table");
        for (const score of this.scores) {
            table.innerHTML+= `
                <tr>
                    <td>${score.name}</td>
                    <td>${score.score}</td>
                </tr>
            `
        }
        table.parentElement.parentElement.parentElement.style.visibility = "visible";

    }
}

class ScoreName {
    name: string;
    score: string;
    constructor(name: string, score: number) {
        // this.score = padString(score, 3);
        this.score = score + "";
        this.name = name;

    }
}