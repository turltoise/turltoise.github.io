import Container from "../../Container.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container: Container) {
        super(container);

        this._instanceContainer.innerHTML = "Opening Panel";
    }
}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;