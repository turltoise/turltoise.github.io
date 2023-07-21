import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class PhysicalAttack extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Physical attack');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
		CapacityProcessor.physicalAttack(this._container, this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;