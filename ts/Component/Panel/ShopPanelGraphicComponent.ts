import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container: Container) {
        super(container);

        this._instanceContainer.style.backgroundColor = "#F2D090";

        let worldList = container.get(WorldList.name);

        let templateContainerExtension = <HTMLElement> this.getCurrentDocument().createElement('div');

        let templateLeftContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateLeftContainer.style.display = "inline-block";
        templateLeftContainer.style.width = "30%";
        templateLeftContainer.style.boxSizing = "border-box";
        templateLeftContainer.style.height = "200px";
        templateLeftContainer.style.padding = "25px";
        templateLeftContainer.style.verticalAlign = "top";


        let templateRightContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateRightContainer.style.display = "inline-block";
        templateRightContainer.style.width = "70%";
        templateRightContainer.style.boxSizing = "border-box";
        templateRightContainer.style.height = "200px";
        templateRightContainer.style.lineHeight = "200px";
        templateRightContainer.style.verticalAlign = "top";

        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            let instanceContainerExtension : HTMLElement = <HTMLElement> templateContainerExtension.cloneNode(true);
            let instanceLeftContainer : HTMLElement = <HTMLElement> templateLeftContainer.cloneNode(true);
            let instanceRightContainer : HTMLElement = <HTMLElement> templateRightContainer.cloneNode(true);
            
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