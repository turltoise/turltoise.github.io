import AbstractCapacity from "./AbstractCapacity.js";
class PhysicalAttack extends AbstractCapacity {
    constructor(container) {
        super(container, 'Physical attack');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        this.physicalAttack(this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;
//# sourceMappingURL=PhysicalAttack.js.map