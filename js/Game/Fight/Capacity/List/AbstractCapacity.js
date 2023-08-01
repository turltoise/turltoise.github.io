import CapacityDescGraphicComponent from "../../../../Component/Capacity/CapacityDescGraphicComponent.js";
import CoreCapacity from "./CoreCapacity.js";
class AbstractCapacity extends CoreCapacity {
    constructor(container, name, element) {
        super(container);
        this._name = name;
        this._element = element;
    }
    trigger(thrower, target) {
        this.annoucementCapacityWithFocus(this.getName(), thrower, target);
    }
    getName() {
        return this._name;
    }
    getElement() {
        return this._element;
    }
    getGraphic() {
        return new CapacityDescGraphicComponent(this._container, this);
    }
}
export default AbstractCapacity;
//# sourceMappingURL=AbstractCapacity.js.map