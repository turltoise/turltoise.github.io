import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class Heal extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Heal');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  CapacityProcessor.shield(this._container, thrower, target, 100, null);
    }
}
export default Heal;