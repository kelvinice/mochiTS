import BossBehavior from "./bossBehavior";
import SunStrikeBehavior from "./SunStrikeBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";

export default class SpearBehavior extends BossBehavior{
    onBehaviorComplete(): void {
    }

    getNextBehavior(): BossBehavior {
        return new SunStrikeBehavior(this.behaviorHandler);
    }


    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(5000, bossBehaviorHandler);
    }
}