import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import AttackBuff from "../../Status/List/AttackBuff.js";
import Status from "../../Status/Status.js";
import Capacity from "../Capacity.js";
import AbstractCapacity from "./AbstractCapacity.js";

class AttackBuffCapacity extends AbstractCapacity {
    constructor(state: State) {
        super(state, 'attack_buff');
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
        const status = new Status("attack_buff", 5, new AttackBuff(this._state, thrower, target), null);
        Capacity.putStatus(this._state, "attack_buff", thrower, target, status);
    }
}
export default AttackBuffCapacity;