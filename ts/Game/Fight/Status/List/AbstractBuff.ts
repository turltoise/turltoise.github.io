import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CoreCapacity from "../../Capacity/List/CoreCapacity.js";

class AbstractBuff extends CoreCapacity {
    protected _thrower: StackPlayCard;
    protected _target: StackPlayCard;

    constructor(container: Container, thrower: StackPlayCard, target: StackPlayCard) {
        super(container);
        this._thrower = thrower;
        this._target = target;
    }
}
export default AbstractBuff;