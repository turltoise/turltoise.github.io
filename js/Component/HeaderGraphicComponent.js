import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
import GoldIndicatorGraphicComponent from "./GoldIndicatorGraphicComponent.js";
import MainMenuGraphicComponent from "./MainMenuGraphicComponent.js";
class HeaderGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        this._instanceContainer.style.backgroundImage = "url(./img/b1.png)";
        this._instanceContainer.style.height = "130px";
        this._instanceContainer.style.backgroundRepeat = "repeat";
        this._instanceContainer.style.backgroundSize = "50% 100%";
        this._instanceContainer.style.padding = "10px";
        const goldIndicator = this._container.get(GoldIndicatorGraphicComponent.name);
        const mainMenu = this._container.get(MainMenuGraphicComponent.name);
        this._instanceContainer.appendChild(goldIndicator);
        this._instanceContainer.appendChild(mainMenu);
    }
}
customElements.define('header-header', HeaderGraphicComponent);
export default HeaderGraphicComponent;
//# sourceMappingURL=HeaderGraphicComponent.js.map