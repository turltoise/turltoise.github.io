import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class PhysicalAttack extends AbstractCapacity {
    constructor(container) {
        super(container, 'Physical attack');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        CapacityProcessor.physicalAttack(this._container, this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;
//# sourceMappingURL=PhysicalAttack.js.map