import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class LifeStealSwordStrike extends AbstractCapacity {
    constructor(state) {
        super(state, 'Life steal sword strike');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        let dmgTaken = CapacityProcessor.physicalAttack(this._state, this.getName(), thrower, target, 80);
        if (dmgTaken > 0) {
            CapacityProcessor.heal(this._state, thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;
//# sourceMappingURL=LifeStealSwordStrike.js.map