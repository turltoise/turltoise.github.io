import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Poison extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'poison');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
        const status = new Status("poison", 3, null, new PoisonTick(this._state, thrower, target)); 
        Capacity.putStatus(this._state, "poison", thrower, target, status);
    }
}
export default Poison;