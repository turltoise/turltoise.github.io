import Capacity from "../Capacity.js";
class AbstractCapacity {
    constructor(state, name) {
        this._state = state;
        this._name = name;
    }
    trigger(thrower, target) {
        Capacity.annoucementCapacityWithFocus(this._state, this.getName(), thrower, target);
    }
    getName() {
        return this._name;
    }
}
export default AbstractCapacity;
//# sourceMappingURL=AbstractCapacity.js.map