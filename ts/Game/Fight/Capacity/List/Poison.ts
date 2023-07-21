import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Poison extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'Poison');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
        const status = new Status(this.getName(), 3, null, new PoisonTick(this._state, thrower, target)); 
        CapacityProcessor.putStatus(this._state, this.getName(), thrower, target, status);
    }
}
export default Poison;