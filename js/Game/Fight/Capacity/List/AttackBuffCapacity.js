import AttackBuff from "../../Status/List/AttackBuff.js";
import Status from "../../Status/Status.js";
import AbstractCapacity from "./AbstractCapacity.js";
class AttackBuffCapacity extends AbstractCapacity {
    constructor(container) {
        super(container, 'Attack buff', null);
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        const status = new Status(this.getName(), 5, new AttackBuff(this._container, thrower, target), null);
        this.putStatus(this.getName(), thrower, target, status);
    }
}
export default AttackBuffCapacity;
//# sourceMappingURL=AttackBuffCapacity.js.map