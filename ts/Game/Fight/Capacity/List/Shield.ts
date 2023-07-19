import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Shield extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'shield');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
		Capacity.shield(this._state, thrower, target, 120, null);
    }
}
export default Shield;