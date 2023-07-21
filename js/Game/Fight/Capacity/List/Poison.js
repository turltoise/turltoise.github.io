import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Poison extends AbstractCapacity {
    constructor(state) {
        super(state, 'poison');
    }
    trigger(thrower, target) {
        const status = new Status(this.getName(), 3, null, new PoisonTick(this._state, thrower, target));
        CapacityProcessor.putStatus(this._state, this.getName(), thrower, target, status);
    }
}
export default Poison;
//# sourceMappingURL=Poison.js.map