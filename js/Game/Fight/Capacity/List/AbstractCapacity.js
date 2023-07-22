import CapacityProcessor from "../CapacityProcessor.js";
class AbstractCapacity {
    constructor(container, name) {
        this._container = container;
        this._name = name;
    }
    trigger(thrower, target) {
        CapacityProcessor.annoucementCapacityWithFocus(this._container, this.getName(), thrower, target);
    }
    getName() {
        return this._name;
    }
}
export default AbstractCapacity;
//# sourceMappingURL=AbstractCapacity.js.map