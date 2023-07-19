import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Element from "../../Element.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class FireBall extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'fire_ball');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
		Capacity.magicAttack(this._state, "fire_ball", thrower, target, 130, Element.FIRE());
    }
}
export default FireBall;