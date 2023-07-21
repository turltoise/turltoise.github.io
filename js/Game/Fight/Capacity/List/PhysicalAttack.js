import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class PhysicalAttack extends AbstractCapacity {
    constructor(state) {
        super(state, 'physical_attack');
    }
    trigger(thrower, target) {
        CapacityProcessor.physicalAttack(this._state, this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;
//# sourceMappingURL=PhysicalAttack.js.map