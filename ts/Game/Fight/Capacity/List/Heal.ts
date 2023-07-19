import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Heal extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'heal');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
		Capacity.shield(this._state, thrower, target, 100, null);
    }
}
export default Heal;