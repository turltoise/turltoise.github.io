import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Shield extends AbstractCapacity {
    constructor(container: Container) {
        super(
            container,
            'Shield',
            null
        );
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  this.shield(thrower, target, 120, null);
    }
}
export default Shield;