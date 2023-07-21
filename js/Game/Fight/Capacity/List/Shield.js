import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Shield extends AbstractCapacity {
    constructor(state) {
        super(state, 'Shield');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        CapacityProcessor.shield(this._state, thrower, target, 120, null);
    }
}
export default Shield;
//# sourceMappingURL=Shield.js.map