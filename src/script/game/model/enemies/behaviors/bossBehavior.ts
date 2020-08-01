import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";

export default abstract class BossBehavior{
    behaviorDuration: number;
    behaviorHandler: BossBehaviorHandler;

    constructor(behaviorDuration: number, bossBehaviorHandler: BossBehaviorHandler) {
        this.behaviorDuration = behaviorDuration;
        this.behaviorHandler = bossBehaviorHandler;
    }

    abstract onBehaviorComplete(): void;
    abstract getNextBehavior(): BossBehavior;
    onBehaviorUpdate(){}

}