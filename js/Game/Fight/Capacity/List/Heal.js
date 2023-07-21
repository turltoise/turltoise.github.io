import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Heal extends AbstractCapacity {
    constructor(state) {
        super(state, 'heal');
    }
    trigger(thrower, target) {
        CapacityProcessor.shield(this._state, thrower, target, 100, null);
    }
}
export default Heal;
//# sourceMappingURL=Heal.js.map