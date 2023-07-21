import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import AttackBuff from "../../Status/List/AttackBuff.js";
import Status from "../../Status/Status.js";
import CapacityProcessor from "../CapacityProcessor.js";
import AbstractCapacity from "./AbstractCapacity.js";

class AttackBuffCapacity extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'attack_buff');
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard) {
        const status = new Status(this.getName(), 5, new AttackBuff(this._state, thrower, target), null);
        CapacityProcessor.putStatus(this._state, this.getName(), thrower, target, status);
    }
}
export default AttackBuffCapacity;