import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Heal extends AbstractCapacity {
    constructor(container) {
        super(container, 'Heal');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        CapacityProcessor.shield(this._container, thrower, target, 100, null);
    }
}
export default Heal;
//# sourceMappingURL=Heal.js.map