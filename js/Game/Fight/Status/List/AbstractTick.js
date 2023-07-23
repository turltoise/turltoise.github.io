import CoreCapacity from "../../Capacity/List/CoreCapacity.js";
class AbstractTick extends CoreCapacity {
    constructor(container, thrower, target) {
        super(container);
        this._thrower = thrower;
        this._target = target;
    }
    tick() { }
}
export default AbstractTick;
//# sourceMappingURL=AbstractTick.js.map