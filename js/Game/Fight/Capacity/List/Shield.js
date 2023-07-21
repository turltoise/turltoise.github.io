import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Shield extends AbstractCapacity {
    constructor(state) {
        super(state, 'shield');
    }
    trigger(thrower, target) {
        CapacityProcessor.shield(this._state, thrower, target, 120, null);
    }
}
export default Shield;
//# sourceMappingURL=Shield.js.map