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

        let worldList = container.get(WorldList.name);

        let templateContainerExtension = <HTMLElement> this.getCurrentDocument().createElement('div');

        let templateLeftContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateLeftContainer.style.display = "inline-block";
        templateLeftContainer.style.width = "30%";
        templateLeftContainer.style.boxSizing = "border-box";
        templateLeftContainer.style.height = "200px";
        templateLeftContainer.style.padding = "25px";
        templateLeftContainer.style.textAlign = "center";
        templateLeftContainer.style.verticalAlign = "top";

        let templateRightContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateRightContainer.style.display = "inline-block";
        templateRightContainer.style.width = "70%";
        templateRightContainer.style.boxSizing = "border-box";
        templateRightContainer.style.height = "200px";
        templateRightContainer.style.verticalAlign = "top";

        let templateBtnBuy = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBtnBuy.style.display = "inline-block";
        templateBtnBuy.style.boxShadow = "2px 4px #222";
		templateBtnBuy.style.backgroundColor = "#FDC911";
        templateBtnBuy.style.height = "30px";
        templateBtnBuy.style.lineHeight = "30px";
        templateBtnBuy.style.padding = "5px";
        templateBtnBuy.style.marginTop = "85px";
        templateBtnBuy.style.borderRadius = "2px";
        templateBtnBuy.style.cursor = "pointer";
        templateBtnBuy.style.userSelect = "none";
        templateBtnBuy.style.caretColor = "transparent";

        let self = this;
        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            let instanceContainerExtension: HTMLElement = <HTMLElement> templateContainerExtension.cloneNode(true);
            let instanceLeftContainer: HTMLElement = <HTMLElement> templateLeftContainer.cloneNode(true);
            let instanceRightContainer: HTMLElement = <HTMLElement> templateRightContainer.cloneNode(true);
            
            let instanceBtnBuy: HTMLElement = <HTMLElement> templateBtnBuy.cloneNode(true);
            instanceBtnBuy.onclick = () => self.buyBooster(world);
            instanceBtnBuy.innerHTML = Number.displayNumber(world.getPriceNextBooster()) + " GOLD";

            instanceLeftContainer.appendChild(new BoosterCard(container, world));
            instanceRightContainer.appendChild(instanceBtnBuy);
            instanceContainerExtension.appendChild(instanceLeftContainer);
            instanceContainerExtension.appendChild(instanceRightContainer);
            this._instanceContainer.appendChild(instanceContainerExtension);
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