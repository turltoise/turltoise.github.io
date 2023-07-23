import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CoreCapacity from "./CoreCapacity.js";

class AbstractCapacity extends CoreCapacity {
    
    protected _name: string;

    constructor(container: Container, name: string) {
        super(container);
        
        this._name = name;
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard): void {
        this.annoucementCapacityWithFocus(this.getName(), thrower, target);
    }

    getName(): string {
        return this._name;
    }
}
export default AbstractCapacity;