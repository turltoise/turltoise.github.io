import Element from "../../Element.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";
class FireBall extends AbstractCapacity {
    constructor(state) {
        super(state, 'fire_ball');
    }
    trigger(thrower, target) {
        CapacityProcessor.magicAttack(this._state, this.getName(), thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;
//# sourceMappingURL=FireBall.js.map