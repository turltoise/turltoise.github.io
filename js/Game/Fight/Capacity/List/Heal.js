import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Heal extends AbstractCapacity {
    constructor(state) {
        super(state, 'heal');
    }
    trigger(thrower, target) {
        Capacity.shield(this._state, thrower, target, 100, null);
    }
}
export default Heal;
//# sourceMappingURL=Heal.js.map