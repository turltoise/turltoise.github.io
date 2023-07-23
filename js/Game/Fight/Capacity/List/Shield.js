import AbstractCapacity from "./AbstractCapacity.js";
class Shield extends AbstractCapacity {
    constructor(container) {
        super(container, 'Shield');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        this.shield(thrower, target, 120, null);
    }
}
export default Shield;
//# sourceMappingURL=Shield.js.map