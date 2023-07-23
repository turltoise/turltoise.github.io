import WorldList from "../../Game/Adventure/WorldList.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        this._instanceContainer.innerHTML = "Shop Panel";
        this._instanceContainer.style.backgroundColor = "#F2D090";
        let worldList = container.get(WorldList.name);
        let templateContainerExtension = this.getCurrentDocument().createElement('div');
        let templateLeftContainer = this.getCurrentDocument().createElement('div');
        templateLeftContainer.style.display = "inline-block";
        templateLeftContainer.style.width = "30%";
        templateLeftContainer.style.boxSizing = "border-box";
        templateLeftContainer.style.height = "200px";
        templateLeftContainer.style.padding = "25px";
        templateLeftContainer.style.verticalAlign = "top";
        let templateRightContainer = this.getCurrentDocument().createElement('div');
        templateRightContainer.style.display = "inline-block";
        templateRightContainer.style.width = "70%";
        templateRightContainer.style.boxSizing = "border-box";
        templateRightContainer.style.height = "200px";
        templateRightContainer.style.lineHeight = "200px";
        templateRightContainer.style.verticalAlign = "top";
        worldList.getList().forEach(((world, position) => {
            let instanceContainerExtension = templateContainerExtension.cloneNode(true);
            let instanceLeftContainer = templateLeftContainer.cloneNode(true);
            let instanceRightContainer = templateRightContainer.cloneNode(true);
            instanceLeftContainer.appendChild(new BoosterCard(container, world));
            instanceRightContainer.innerHTML = "BUY";
            instanceContainerExtension.appendChild(instanceLeftContainer);
            instanceContainerExtension.appendChild(instanceRightContainer);
            this._instanceContainer.appendChild(instanceContainerExtension);
        }));
    }
}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;
//# sourceMappingURL=ShopPanelGraphicComponent.js.map