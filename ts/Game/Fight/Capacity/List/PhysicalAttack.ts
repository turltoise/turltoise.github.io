import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class PhysicalAttack extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'physical_attack');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
		Capacity.physicalAttack(this._state, "physical_attack", thrower, target, 100);
    }
}
export default PhysicalAttack;