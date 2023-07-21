import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Shield extends AbstractCapacity {
    constructor(container: Container) {
      super(container, 'Shield');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  CapacityProcessor.shield(this._container, thrower, target, 120, null);
    }
}
export default Shield;