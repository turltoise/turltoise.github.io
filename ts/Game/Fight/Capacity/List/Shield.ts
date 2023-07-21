import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Shield extends AbstractCapacity {
    constructor(state: State) {
      super(state, 'Shield');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  CapacityProcessor.shield(this._state, thrower, target, 120, null);
    }
}
export default Shield;