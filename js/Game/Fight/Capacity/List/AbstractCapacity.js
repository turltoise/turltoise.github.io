import CoreCapacity from "./CoreCapacity.js";
class AbstractCapacity extends CoreCapacity {
    constructor(container, name) {
        super(container);
        this._name = name;
    }
    trigger(thrower, target) {
        this.annoucementCapacityWithFocus(this.getName(), thrower, target);
    }
    getName() {
        return this._name;
    }
}
export default AbstractCapacity;
//# sourceMappingURL=AbstractCapacity.js.map