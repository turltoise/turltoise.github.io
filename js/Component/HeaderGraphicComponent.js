import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
class HeaderGraphicComponent extends AbstractGraphicComponent {
    constructor(state, myGoldIndicator, myMainMenu) {
        super(state);
        this._instanceContainer.style.backgroundImage = "url(./img/b1.png)";
        this._instanceContainer.style.height = "180px";
        this._instanceContainer.style.backgroundRepeat = "repeat";
        this._instanceContainer.style.backgroundSize = "50% 100%";
        this._instanceContainer.style.padding = "10px";
        this._instanceContainer.style.margin = "40px";
        this._instanceContainer.appendChild(myGoldIndicator);
        this._instanceContainer.appendChild(myMainMenu);
    }
}
customElements.define('header-header', HeaderGraphicComponent);
export default HeaderGraphicComponent;
//# sourceMappingURL=HeaderGraphicComponent.js.map