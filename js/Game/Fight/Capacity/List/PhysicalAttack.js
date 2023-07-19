import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";
class PhysicalAttack extends AbstractCapacity {
    constructor(state) {
        super(state, 'physical_attack');
    }
    trigger(thrower, target) {
        Capacity.physicalAttack(this._state, "physical_attack", thrower, target, 100);
    }
}
export default PhysicalAttack;
//# sourceMappingURL=PhysicalAttack.js.map