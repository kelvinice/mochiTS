import Scene from "../../../module/context/core/scene/scene";
import SceneEngine from "../../../module/context/core/scene/sceneEngine";
import global from "../../../module/context/generals/global";
import Global from "../../../module/context/generals/global";
import {padString} from "../model/gameMenu";

export default class GameOverScene extends Scene{
    audio: HTMLAudioElement;
    scores: ScoreName[];
    

    onCreated(): void {
    }

    onRender(ctx: CanvasRenderingContext2D): void {
        ctx.font = "bold 50pt arial";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", SceneEngine.getInstance().canvas.width/2 - 200 , 100 );

        ctx.font = "bold 30pt arial";
        ctx.fillText("High Score", SceneEngine.getInstance().canvas.width/2 - 120 , 200 );

        ctx.font = "bold 13pt arial";
        let i = 0;
        for (const score of this.scores) {
            i++;
            ctx.fillText(score.name.toUpperCase(), SceneEngine.getInstance().canvas.width/2 - 150 , 300 + i * 25);
            ctx.fillText(score.score, SceneEngine.getInstance().canvas.width/2 + 150 , 300 + i * 25 );
            if(score.name === Global.getInstance().name){
                ctx.strokeRect(SceneEngine.getInstance().canvas.width/2 - 165,
                    300 + i * 25 - 20,
                    350,
                    29
                    )
            }
        }

        
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
        this.scores.push(new ScoreName(Global.getInstance().name, score));

        this.scores.sort((a,b)=>{
            return (+b.score) - (+a.score);
        })

    }
}

class ScoreName {
    name: string;
    score: string;
    constructor(name: string, score: number) {
        this.score = padString(score, 3);
        this.name = name;
    }
}