import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class LifeStealSwordStrike extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Life steal sword strike');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
        let dmgTaken = CapacityProcessor.physicalAttack(this._container, this.getName(), thrower, target, 80);
        if (dmgTaken > 0) {
            CapacityProcessor.heal(this._container, thrower, target, 20, dmgTaken);
        }
    }
}
export default LifeStealSwordStrike;