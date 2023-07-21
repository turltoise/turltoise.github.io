import Container from "../../Container.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container: Container) {
        super(container);

        this._instanceContainer.innerHTML = "Shop Panel";
    }
}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;