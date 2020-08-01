import BossBehavior from "./bossBehavior";
import SuckBehavior from "./SuckBehavior";
import BossBehaviorHandler from "../../../../handlers/bossBehaviorHandler";

export default class SunStrikeBehavior extends BossBehavior{
    onBehaviorComplete(): void {
    }

    getNextBehavior(): BossBehavior {
        return new SuckBehavior(this.behaviorHandler);
    }


    constructor(bossBehaviorHandler: BossBehaviorHandler) {
        super(5000, bossBehaviorHandler);
    }
}