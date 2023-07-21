import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import Element from "../../Element.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class FireBall extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'Fireball');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  CapacityProcessor.magicAttack(this._state, this.getName(), thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;