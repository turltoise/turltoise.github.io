import State from "../../Game/State/State.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(state: State) {
        super(state);

        this._instanceContainer.innerHTML = "Shop Panel";
    }
}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;