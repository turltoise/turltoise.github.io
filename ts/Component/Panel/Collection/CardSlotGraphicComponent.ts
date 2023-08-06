import Container from "../../../Container.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";

class CardSlotGraphicComponent extends AbstractGraphicComponent {
    constructor(container: Container) {
        super(container);
        this._instanceContainer.style.background = "linear-gradient(120deg, #9E9E9E 60%, #A8A8A8 60%)";
        this._instanceContainer.style.display = "inline-block";
        this._instanceContainer.style.verticalAlign = "top";
        this._instanceContainer.style.margin = "5px";
        this._instanceContainer.style.width = "136px";
        this._instanceContainer.style.height = "234px";
    }

    appendChild<T extends Node>(node: T): T {
        return this._instanceContainer.appendChild(node);
    }
}
customElements.define('collection-slot', CardSlotGraphicComponent);
export default CardSlotGraphicComponent;