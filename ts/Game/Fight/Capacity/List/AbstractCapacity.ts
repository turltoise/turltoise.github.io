import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Capacity from "../Capacity.js";

class AbstractCapacity {
    protected _state: State;
    protected _name: string;

    constructor(state: State, name: string) {
        this._state = state;
        this._name = name;
    }

    trigger(thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight): void {
        Capacity.annoucementCapacityWithFocus(this._state, this.getName(), thrower, target);
    }

    getName(): string {
        return this._name;
    }
}
export default AbstractCapacity;