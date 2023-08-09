import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import Resource from "../../Game/Resource.js";
import F from "../../Game/Tools/F.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class ShopPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _btnBuyList: Map<AbstractWorld, HTMLElement>;
    private _boosterCardList: Map<AbstractWorld, BoosterCard>;

    constructor(container: Container) {
        super(container);

        this._btnBuyList = new Map();
        this._boosterCardList = new Map();

        let keyframes = `
        @keyframes clickBuyBtn {
            0%   {
                box-shadow: 2px 4px rgba(75, 75, 75, 0.5);
                transform: translate(0, 0);
            }
            50%  {
                box-shadow: 0px 0px rgba(75, 75, 75, 0.5);
                transform: translate(2px, 4px);
            }
            100%   {
                box-shadow: 2px 4px rgba(75, 75, 75, 0.5);
                transform: translate(0, 0);
            }
        }
        @keyframes clickBuyBooster {
            0%   {
                opacity: 1;
            }
            50%   {
                opacity: 0;
            }
            100%   {
                opacity: 0;
            }
        }
        `;
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
        templateStyle.innerHTML = keyframes;
        this._instanceContainer.appendChild(templateStyle);  

        this._instanceContainer.style.backgroundColor = "#F2D090";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";
        this._instanceContainer.style.textAlign = "center";

        let worldList = container.get(WorldList.name);

        let instanceTitleShop = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceTitleShop.innerHTML = "The Shop";
        instanceTitleShop.style.fontWeight = "900";
        instanceTitleShop.style.fontSize = "30px";
        instanceTitleShop.style.marginLeft = "40px";
        instanceTitleShop.style.marginBottom = "40px";
        instanceTitleShop.style.textAlign = "left";
        this._instanceContainer.appendChild(instanceTitleShop);

        let templateVerticalPlank = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateVerticalPlank.style.backgroundColor = "#B25B21";
        templateVerticalPlank.style.border = "1px solid black";
        templateVerticalPlank.style.width = "20px";
        templateVerticalPlank.style.height = "546px";
        templateVerticalPlank.style.display = "inline-block";
        templateVerticalPlank.style.verticalAlign = "top";

        let instanceLeftWoodenPlank: HTMLElement = <HTMLElement> templateVerticalPlank.cloneNode(true);
        let instanceRightWoodenPlank: HTMLElement = <HTMLElement> templateVerticalPlank.cloneNode(true);

        let instanceContainerListExtension = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceContainerListExtension.style.display = "inline-block";
        instanceContainerListExtension.style.verticalAlign = "top";
        instanceContainerListExtension.style.backgroundColor = "#e05048";
        //instanceContainerListExtension.style.marginLeft = "70px";
        //instanceContainerListExtension.style.marginRight = "70px";
        //instanceContainerListExtension.style.marginBottom = "70px";
        instanceContainerListExtension.style.borderRadius = "3px";
        this._instanceContainer.appendChild(instanceLeftWoodenPlank);
        this._instanceContainer.appendChild(instanceContainerListExtension);
        this._instanceContainer.appendChild(instanceRightWoodenPlank);

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

        let templateWoodenPlank = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateWoodenPlank.style.width = "100%";
        templateWoodenPlank.style.height = "20px";
        templateWoodenPlank.style.boxSizing = "border-box";
        templateWoodenPlank.style.backgroundColor = "#B25B21";
        templateWoodenPlank.style.borderTop = "1px solid black";
        templateWoodenPlank.style.borderBottom = "1px solid black";

        let instanceWoodenPlank: HTMLElement = <HTMLElement> templateWoodenPlank.cloneNode(true);
        instanceContainerListExtension.appendChild(instanceWoodenPlank);
        let self = this;
        let count = 0;
        worldList.getList().forEach(((world:AbstractWorld, position: number) => {
            count++;
            let instanceContainerExtension: HTMLElement = <HTMLElement> templateContainerExtension.cloneNode(true);
            let instanceLeftContainer: HTMLElement = <HTMLElement> templateLeftContainer.cloneNode(true);
            let instanceRightContainer: HTMLElement = <HTMLElement> templateRightContainer.cloneNode(true);
            
            let instanceBtnBuy: HTMLElement = <HTMLElement> templateBtnBuy.cloneNode(true);
            instanceContainerExtension.onclick = () => self.buyBooster(world);
            instanceBtnBuy.innerHTML = Number.displayNumber(world.getPriceNextBooster()) + " Gold";
            this._btnBuyList.set(world, instanceBtnBuy);

            let boosterCard = new BoosterCard(container, world);
            this._boosterCardList.set(world, boosterCard);
            instanceLeftContainer.appendChild(boosterCard);
            instanceRightContainer.appendChild(instanceBtnBuy);
            instanceContainerExtension.appendChild(instanceLeftContainer);
            instanceContainerExtension.appendChild(instanceRightContainer);
            instanceContainerListExtension.appendChild(instanceContainerExtension);
            if (count >= 5 ) {
                count = 0;
                let instanceWoodenPlank: HTMLElement = <HTMLElement> templateWoodenPlank.cloneNode(true);
                instanceContainerListExtension.appendChild(instanceWoodenPlank);
            }
        }));
        if (count != 0) {
            let instanceWoodenPlank: HTMLElement = <HTMLElement> templateWoodenPlank.cloneNode(true);
            instanceContainerListExtension.appendChild(instanceWoodenPlank);
        }
    }

    buyBooster(world: AbstractWorld) {
        this.#animationBtnBuyBooster(world);
        const resource = this._container.get(Resource.name);
        const chat = this._container.get(Chat.name);
        const booster = this._container.get(Booster.name);
        if (resource.getGold() >= world.getPriceNextBooster()) {
            this.#animationBoosterBuyBooster(world);
            resource.removeGold(world.getPriceNextBooster());
            booster.buyBooster(world); 
            chat.addChatMessage(
                F.sprintf(
                    "You bought booster <font style='font-weight:bold;'>%s</font>",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        } else {
            chat.addChatMessage(
                F.sprintf(
                    "You don't have enough money to buy booster <font style='font-weight:bold;'>%s</font>",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        }
    }

    #animationBtnBuyBooster(world: AbstractWorld) {
        let speedAnimation = 250;
        let btn:HTMLElement = this._btnBuyList.get(world);
        btn.style.animation = 'non';
        btn.offsetHeight;
        btn.style.animation = null;
        btn.style.animationDuration = speedAnimation + "ms";
        btn.style.animationTimingFunction = "linear";
        btn.style.animationName = "clickBuyBtn";
        btn.style.animationDelay = "0ms";
        btn.style.animationIterationCount = "1";
        btn.style.animationFillMode = "none";
        btn.style.animationPlayState = "running";
        setTimeout(function () {
            btn.style.animation = 'non';
            btn.offsetHeight;
            btn.style.animation = null;
        }, speedAnimation);
    }

    #animationBoosterBuyBooster(world: AbstractWorld) {
        let speedAnimation = 500;
        let booster:BoosterCard = this._boosterCardList.get(world);
        booster.style.animation = 'non';
        booster.offsetHeight;
        booster.style.animation = null;
        booster.style.animationDuration = speedAnimation + "ms";
        booster.style.animationTimingFunction = "linear";
        booster.style.animationName = "clickBuyBooster";
        booster.style.animationDelay = "0ms";
        booster.style.animationIterationCount = "1";
        booster.style.animationFillMode = "none";
        booster.style.animationPlayState = "running";
        setTimeout(function () {
            booster.style.animation = 'non';
            booster.offsetHeight;
            booster.style.animation = null;
        }, speedAnimation);
    }

}
customElements.define('shop-panel', ShopPanelGraphicComponent);
export default ShopPanelGraphicComponent;