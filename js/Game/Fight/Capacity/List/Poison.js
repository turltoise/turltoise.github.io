import Element from "../../Element.js";
import PoisonTick from "../../Status/List/PoisonTick.js";
import Status from "../../Status/Status.js";
import AbstractCapacity from "./AbstractCapacity.js";
class Poison extends AbstractCapacity {
    constructor(container) {
        super(container, 'Poison', Element.PLANT());
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        const status = new Status(this.getName(), 3, null, new PoisonTick(this._container, thrower, target));
        this.putStatus(this.getName(), thrower, target, status);
    }
}
export default Poison;
//# sourceMappingURL=Poison.js.map