import GameScene from "../game/scenes/gameScene";
import TrueRandom from "./trueRandom";
import SceneEngine from "../../module/context/core/scene/sceneEngine";
import WaveHandler from "./waveHandler";
import Player from "../game/model/player";
import ProjectileHandler from "./projectileHandler";
import GameMenu from "../game/model/gameMenu";

export default class PerkHandler {
    private static instance: PerkHandler = null;
    private trueRandom: TrueRandom;
    public static getInstance(){
        if(this.instance=== null){
            this.instance = new PerkHandler();
        }
        return this.instance;
    }

    perks: Perk[];
    activatedPerk: any;
    perksToChoose: Perk[];
    waveHandler: WaveHandler;
    public gameMenu: GameMenu;

    private constructor() {
        this.perks = [];
        this.activatedPerk = {};
        this.perks.push(new Perk("dmg+10", "Attack Damage + 10"));
        this.perks.push(new Perk("dmg+2foreveryexort", "Attack Damage + 2 for every Exort"));
        this.perks.push(new Perk("movementspeed+50%", "Movement Speed + 50%",  () => {
            Player.movementSpeed  = Player.movementSpeed *3/2;
        }));
        this.perks.push(new Perk("heart+2" , "Life + 2", ()=>{
            this.gameMenu.increaseHeart();
            this.gameMenu.increaseHeart();
        }));
        this.perks.push(new Perk("projectilespeed+100%", "Attack Projectile Speed + 100%"));
        this.perks.push(new Perk("attackspeed+30%", "Delay between each attack reduced 30%", function () {
            ProjectileHandler.fireRate = ProjectileHandler.fireRate * 70/100;
        }));
        this.perks.push(new Perk("sunstrikedmg+50", "Sun Strike Damage + 50"));
        this.perks.push(new Perk("sunstrikecost-1", "Sun Strike cost 1 less Exort"));
        this.perks.push(new Perk("scoreincrease2perenemy", "Score Per Enemy + 2"));
        this.perksToChoose = [];
        this.trueRandom = new TrueRandom();
        this.trueRandom.randSeed();
    }




    isActivate(name: string): boolean{
        return this.activatedPerk[name];
    }

    render(ctx: CanvasRenderingContext2D){
        let boxWidth = GameScene.TILE_SIZE * 4;
        let top = GameScene.TILE_SIZE *2;

        let middle = SceneEngine.getInstance().canvas.width / 2;
        let x = middle - boxWidth * 3/2;
        for (let i = 0; i < this.perksToChoose.length; i++) {
            this.drawBox(ctx, x + i * boxWidth, top, i+1, this.perksToChoose[i]);
        }

    }

    drawBox(ctx: CanvasRenderingContext2D, x: number, y: number, idx: number, perk: Perk){
        let height = GameScene.TILE_SIZE * 2;
        let width = GameScene.TILE_SIZE * 4;

        ctx.fillStyle = "white";
        ctx.fillRect(x,y, GameScene.TILE_SIZE * 4, height );
        ctx.strokeStyle = "black";
        ctx.strokeRect(x,y, GameScene.TILE_SIZE * 4, height );
        ctx.fillStyle = "black";
        ctx.font = "bold "+GameScene.TILE_SIZE /4+"pt arial";
        ctx.fillText(perk.text, x + 10, y + GameScene.TILE_SIZE * 2 /3, width-20);

        ctx.fillText(idx+"", x + width/2, y + height - GameScene.TILE_SIZE/2, width);
    }

    addPerkToChoose(){
        let ps = [...this.perks];

        for (let i = 0; i < 3; i++) {
            let idx = this.trueRandom.randomNumber(0, ps.length);
            let choosen = ps[idx];
            ps.splice(idx, 1);
            this.perksToChoose.push(choosen);
        }
    }

    inputPerk(num: number){
        if(num >= 1 && num <= this.perksToChoose.length){
            this.perksToChoose[num-1].active();
            this.waveHandler.choosePerk();
        }
    }
}

class Perk{
    name: string;
    onChooseFunction: Function;
    isActive: boolean;
    text: string;

    constructor(name: string, text: string, onChooseFunction: Function = null) {
        this.isActive = false;
        this.name = name;
        this.onChooseFunction = onChooseFunction;
        this.text = text;
    }

    active(){
        if(this.onChooseFunction ){
            this.onChooseFunction();
        }
        PerkHandler.getInstance().activatedPerk[this.name] = this;
        PerkHandler.getInstance().perks.splice(PerkHandler.getInstance().perks.indexOf(this),1);
        PerkHandler.getInstance().perksToChoose = [];
    }
}