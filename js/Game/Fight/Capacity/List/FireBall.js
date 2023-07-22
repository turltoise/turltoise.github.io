import Element from "../../Element.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class FireBall extends AbstractCapacity {
    constructor(container) {
        super(container, 'Fireball');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        CapacityProcessor.magicAttack(this._container, this.getName(), thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;
//# sourceMappingURL=FireBall.js.map