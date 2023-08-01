import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Heal extends AbstractCapacity {
    constructor(container: Container) {
        super(
            container,
            'Heal',
            null
        );
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  this.heal(thrower, target, 100, null);
    }
}
export default Heal;