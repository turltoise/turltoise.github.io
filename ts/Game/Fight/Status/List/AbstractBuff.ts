import StackPlayCard from "../../../Card/StackPlayCard.js";
import State from "../../../State/State.js";

class AbstractBuff {
    protected _state: State;
    protected _thrower: StackPlayCard;
    protected _target: StackPlayCard;

    constructor(state: State, thrower: StackPlayCard, target: StackPlayCard) {
        this._state = state;
        this._thrower = thrower;
        this._target = target;
    }
}
export default AbstractBuff;