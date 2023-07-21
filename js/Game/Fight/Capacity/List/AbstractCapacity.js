import CapacityProcessor from "../CapacityProcessor.js";
class AbstractCapacity {
    constructor(state, name) {
        this._state = state;
        this._name = name;
    }
    trigger(thrower, target) {
        CapacityProcessor.annoucementCapacityWithFocus(this._state, this.getName(), thrower, target);
    }
    getName() {
        return this._name;
    }
}
export default AbstractCapacity;
//# sourceMappingURL=AbstractCapacity.js.map