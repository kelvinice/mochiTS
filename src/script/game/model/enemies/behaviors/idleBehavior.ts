import BossBehavior from "./bossBehavior";
import SpearBehavior from "./SpearBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";

export default class IdleBehavior extends BossBehavior{
    getNextBehavior(): BossBehavior {
        return new SpearBehavior(this.behaviorHandler);
    }

    onBehaviorComplete(): void {
    }


    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(3000, bossBehaviorHandler);
    }
}