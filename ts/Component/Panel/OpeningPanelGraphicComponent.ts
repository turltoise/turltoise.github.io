import State from "../../Game/State/State.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(state: State) {
        super(state);

        this._instanceContainer.innerHTML = "Opening Panel";
    }
}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;