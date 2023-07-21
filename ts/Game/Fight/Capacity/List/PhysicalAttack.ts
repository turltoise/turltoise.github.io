import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class PhysicalAttack extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'physical_attack');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
		  CapacityProcessor.physicalAttack(this._state, this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;