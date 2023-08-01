import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import AbstractCapacity from "./AbstractCapacity.js";

class LifeStealSwordStrike extends AbstractCapacity {
    constructor(container: Container) {
        super(
            container,
            'Life steal sword strike',
            null
        );
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
        let dmgTaken = this.physicalAttack(this.getName(), thrower, target, 80);
        if (dmgTaken > 0) {
            this.heal(thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;