import Element from "../../Element.js";
import AbstractCapacity from "./AbstractCapacity.js";
class FireBall extends AbstractCapacity {
    constructor(container) {
        super(container, 'Fireball', Element.FIRE());
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        this.magicAttack(this.getName(), thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;
//# sourceMappingURL=FireBall.js.map