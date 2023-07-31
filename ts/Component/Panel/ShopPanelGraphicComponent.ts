import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import Chat from "../../Game/Chat/Chat.js";
import Resource from "../../Game/Resource.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container: Container) {
        super(container);

        this._instanceContainer.style.backgroundColor = "#F2D090";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";

        let worldList = container.get(WorldList.name);

        let instanceTitleShop = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceTitleShop.innerHTML = "The Shop";
        instanceTitleShop.style.fontWeight = "900";
        instanceTitleShop.style.fontSize = "30px";
        instanceTitleShop.style.marginLeft = "40px";
        instanceTitleShop.style.marginBottom = "40px";
        this._instanceContainer.appendChild(instanceTitleShop);

        let instanceContainerListExtension = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceContainerListExtension.style.backgroundColor = "red";
        instanceContainerListExtension.style.marginLeft = "70px";
        instanceContainerListExtension.style.marginRight = "70px";
        instanceContainerListExtension.style.marginBottom = "70px";
        instanceContainerListExtension.style.borderRadius = "3px";
        this._instanceContainer.appendChild(instanceContainerListExtension);

        let templateContainerExtension = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateContainerExtension.style.display = "inline-block";
        templateContainerExtension.style.textAlign = "center";
        templateContainerExtension.style.margin = "10px";
        templateContainerExtension.style.borderRadius = "3px";
        templateContainerExtension.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%,rgba(0, 0, 0, 0) 51%, rgba(0, 0, 0, 0.0) 100%)";

        let templateLeftContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateLeftContainer.style.display = "block";
        templateLeftContainer.style.boxSizing = "border-box";
        templateLeftContainer.style.padding = "25px";
        templateLeftContainer.style.textAlign = "center";
        templateLeftContainer.style.verticalAlign = "top";

        let templateRightContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateRightContainer.style.boxSizing = "border-box";
        templateRightContainer.style.verticalAlign = "top";
        templateRightContainer.style.marginTop = "-20px";
        templateRightContainer.style.marginBottom = "20px";

        let templateBtnBuy = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBtnBuy.style.display = "inline-block";
        templateBtnBuy.style.boxShadow = "2px 4px rgba(75, 75, 75, 0.5)";
		templateBtnBuy.style.backgroundColor = "#FDC911";
        templateBtnBuy.style.height = "14px";
        templateBtnBuy.style.lineHeight = "14px";
        templateBtnBuy.style.padding = "5px";
        templateBtnBuy.style.borderRadius = "2px";
        templateBtnBuy.style.cursor = "pointer";
        templateBtnBuy.style.userSelect = "none";
        templateBtnBuy.style.caretColor = "transparent";
        templateBtnBuy.style.fontSize = "14px";

        let self = this;
        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            let instanceContainerExtension: HTMLElement = <HTMLElement> templateContainerExtension.cloneNode(true);
            let instanceLeftContainer: HTMLElement = <HTMLElement> templateLeftContainer.cloneNode(true);
            let instanceRightContainer: HTMLElement = <HTMLElement> templateRightContainer.cloneNode(true);
            
            let instanceBtnBuy: HTMLElement = <HTMLElement> templateBtnBuy.cloneNode(true);
            instanceBtnBuy.onclick = () => self.buyBooster(world);
            instanceBtnBuy.innerHTML = Number.displayNumber(world.getPriceNextBooster()) + " Gold";

            instanceLeftContainer.appendChild(new BoosterCard(container, world));
            instanceRightContainer.appendChild(instanceBtnBuy);
            instanceContainerExtension.appendChild(instanceLeftContainer);
            instanceContainerExtension.appendChild(instanceRightContainer);
            instanceContainerListExtension.appendChild(instanceContainerExtension);
        }));
    }

    buyBooster(world: AbstractWorld) {
        const resource = this._container.get(Resource.name);
        const chat = this._container.get(Chat.name);
        const booster = this._container.get(Booster.name);
        if (resource.getGold() >= world.getPriceNextBooster()) {
            resource.removeGold(world.getPriceNextBooster());
            booster.buyBooster(world); 
            chat.addChatMessage("You bought booster " + world.getName() + ".");
        } else {
            chat.addChatMessage("You don't have enough money to buy booster " + world.getName() + ".");
        }
    }
}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;