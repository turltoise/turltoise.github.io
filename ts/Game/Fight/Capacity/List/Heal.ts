import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Heal extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'heal');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
		CapacityProcessor.shield(this._state, thrower, target, 100, null);
    }
}
export default Heal;