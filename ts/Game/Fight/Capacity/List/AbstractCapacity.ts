import CapacityDescGraphicComponent from "../../../../Component/Capacity/CapacityDescGraphicComponent.js";
import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import CoreCapacity from "./CoreCapacity.js";

class AbstractCapacity extends CoreCapacity {
    protected _name: string;
    protected _element: string;

    constructor(
        container: Container,
        name: string,
        element: string
     ) {
        super(container);
        
        this._name = name;
        this._element = element;
    }

    trigger(thrower: StackPlayCard, target: StackPlayCard): void {
        this.annoucementCapacityWithFocus(this.getName(), thrower, target);
    }

    getName(): string {
        return this._name;
    }

    getElement(): string {
        return this._element;
    }

    getGraphic(): CapacityDescGraphicComponent {
        return new CapacityDescGraphicComponent(this._container, this);
    }
}
export default AbstractCapacity;