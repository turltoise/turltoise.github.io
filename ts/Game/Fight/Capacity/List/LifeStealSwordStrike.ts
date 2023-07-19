import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class LifeStealSwordStrike extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'life_steal_sword_strike');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
        let dmgTaken = Capacity.physicalAttack(this._state, "life_steal_sword_strike", thrower, target, 80);
        if (dmgTaken > 0) {
            Capacity.heal(this._state, thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;