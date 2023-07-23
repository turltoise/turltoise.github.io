import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import Element from "../../Element.js";
import AbstractCapacity from "./AbstractCapacity.js";

class FireBall extends AbstractCapacity {
    constructor(container: Container) {
        super(container, 'Fireball');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
      super.trigger(thrower, target);
		  this.magicAttack(this.getName(), thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;