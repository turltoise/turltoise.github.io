import Element from "../../Element.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";
class FireBall extends AbstractCapacity {
    constructor(state) {
        super(state, 'fire_ball');
    }
    trigger(thrower, target) {
        Capacity.magicAttack(this._state, "fire_ball", thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;
//# sourceMappingURL=FireBall.js.map