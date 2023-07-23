import AbstractCapacity from "./AbstractCapacity.js";
class LifeStealSwordStrike extends AbstractCapacity {
    constructor(container) {
        super(container, 'Life steal sword strike');
    }
    trigger(thrower, target) {
        super.trigger(thrower, target);
        let dmgTaken = this.physicalAttack(this.getName(), thrower, target, 80);
        if (dmgTaken > 0) {
            this.heal(thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;
//# sourceMappingURL=LifeStealSwordStrike.js.map