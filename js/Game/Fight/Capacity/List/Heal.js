import AbstractCapacity from "./AbstractCapacity.js";
class Heal extends AbstractCapacity {
    constructor(container) {
        super(container, 'Heal');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        this.heal(thrower, target, 100, null);
    }
}
export default Heal;
//# sourceMappingURL=Heal.js.map