import AggregateCardComputedForFight from "../../../Card/AggregateCardComputedForFight.js";
import State from "../../../State/State.js";
import Status from "../Status.js";

class AbstractTick {
    protected _state: State;
    protected _thrower: AggregateCardComputedForFight;
    protected _target: AggregateCardComputedForFight;

    constructor(state: State, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
        this._state = state;
        this._thrower = thrower;
        this._target = target;
    }
    tick() {}
}
export default AbstractTick;