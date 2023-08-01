import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import AbstractCapacity from "./AbstractCapacity.js";

class PhysicalAttack extends AbstractCapacity {
    constructor(container: Container) {
        super(
            container,
            'Physical attack',
            null
         );
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        super.trigger(thrower, target);
		this.physicalAttack(this.getName(), thrower, target, 100);
    }
}
export default PhysicalAttack;