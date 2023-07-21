import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";

class AbstractTick {
    protected _container: Container;
    protected _thrower: StackPlayCard;
    protected _target: StackPlayCard;

    constructor(container: Container, thrower: StackPlayCard, target: StackPlayCard) {
        this._container = container;
        this._thrower = thrower;
        this._target = target;
    }
    tick() {}
}
export default AbstractTick;