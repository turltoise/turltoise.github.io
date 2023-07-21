import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";
import CapacityProcessor from "../CapacityProcessor.js";

class AbstractCapacity {
    protected _state: State;
    protected _name: string;

    constructor(state: State, name: string) {
        this._state = state;
        this._name = name;
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard): void {
        CapacityProcessor.annoucementCapacityWithFocus(this._state, this.getName(), thrower, target);
    }

    getName(): string {
        return this._name;
    }
}
export default AbstractCapacity;