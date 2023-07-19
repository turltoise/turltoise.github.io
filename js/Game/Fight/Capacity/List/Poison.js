import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Poison extends AbstractCapacity {
    constructor(state) {
        super(state, 'poison');
    }
    trigger(thrower, target) {
        const status = new Status("poison", 3, null, new PoisonTick(this._state, thrower, target));
        Capacity.putStatus(this._state, "poison", thrower, target, status);
    }
}
export default Poison;
//# sourceMappingURL=Poison.js.map