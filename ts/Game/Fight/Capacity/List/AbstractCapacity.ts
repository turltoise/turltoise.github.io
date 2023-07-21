import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CapacityProcessor from "../CapacityProcessor.js";

class AbstractCapacity {
    protected _container: Container;
    protected _name: string;

    constructor(container: Container, name: string) {
        this._container = container;
        this._name = name;
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard): void {
        CapacityProcessor.annoucementCapacityWithFocus(this._container, this.getName(), thrower, target);
    }

    getName(): string {
        return this._name;
    }
}
export default AbstractCapacity;