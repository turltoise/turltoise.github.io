import Container from "../../Container.js";
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";

class AbstractPanelGraphicComponent extends AbstractGraphicComponent {
	constructor(container: Container) {
        super(container);

        this._instanceContainer.style.minHeight = "540px";
    }
}
export default AbstractPanelGraphicComponent;
