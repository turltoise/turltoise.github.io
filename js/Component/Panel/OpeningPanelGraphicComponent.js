import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(state) {
        super(state);
        this._instanceContainer.innerHTML = "Opening Panel";
    }
}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;
//# sourceMappingURL=OpeningPanelGraphicComponent.js.map