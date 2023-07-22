import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        this._instanceContainer.innerHTML = "Shop Panel";
    }
}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;
//# sourceMappingURL=ShopPanelGraphicComponent.js.map