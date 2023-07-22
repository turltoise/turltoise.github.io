import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Shield extends AbstractCapacity {
    constructor(container) {
        super(container, 'Shield');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        CapacityProcessor.shield(this._container, thrower, target, 120, null);
    }
}
export default Shield;
//# sourceMappingURL=Shield.js.map