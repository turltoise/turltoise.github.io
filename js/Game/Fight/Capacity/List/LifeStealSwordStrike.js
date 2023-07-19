import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";
class LifeStealSwordStrike extends AbstractCapacity {
    constructor(state) {
        super(state, 'life_steal_sword_strike');
    }
    trigger(thrower, target) {
        let dmgTaken = Capacity.physicalAttack(this._state, "life_steal_sword_strike", thrower, target, 80);
        if (dmgTaken > 0) {
            Capacity.heal(this._state, thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;
//# sourceMappingURL=LifeStealSwordStrike.js.map