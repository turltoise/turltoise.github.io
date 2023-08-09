import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import Chat from "../../Game/Chat/Chat.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import F from "../../Game/Tools/F.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import OpenedBoosterGraphicComponent from "./Opening/OpenedBoosterGraphicComponent.js";

class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _listDisplayNumberBoosterOwned: Map<AbstractWorld, HTMLElement>;
    private _instanceContainerOpening: HTMLElement;
    
    constructor(container: Container) {
        super(container);
        this._listDisplayNumberBoosterOwned = new Map();
        let worldList = container.get(WorldList.name);

        this._instanceContainer.style.backgroundColor = "#A5ABDB";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";

        let templateContainerBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateContainerBooster.style.display = "inline-block";
        templateContainerBooster.style.textAlign = "center";
        templateContainerBooster.style.margin = "10px";
        templateContainerBooster.style.marginBottom = "50px";
        templateContainerBooster.style.padding = "20px";
        templateContainerBooster.style.borderRadius = "3px";
        templateContainerBooster.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%,rgba(0, 0, 0, 0) 51%, rgba(0, 0, 0, 0.0) 100%)";


        let instanceContainerListBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceContainerListBooster.style.textAlign = "left";
        instanceContainerListBooster.style.backgroundColor = "#828acd";
        instanceContainerListBooster.style.margin = "70px 175px";
        instanceContainerListBooster.style.padding = "20px";
        instanceContainerListBooster.style.height = "415px";
    
        let templateBtnOpen = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBtnOpen.style.display = "block";
        templateBtnOpen.style.background = "linear-gradient(to left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.5) 100%)";
		templateBtnOpen.style.backgroundColor = "#eb5554";
        templateBtnOpen.style.color = "white";
        templateBtnOpen.style.padding = "5px"
        templateBtnOpen.style.cursor = "pointer";
        templateBtnOpen.style.userSelect = "none";
        templateBtnOpen.style.caretColor = "transparent";
        templateBtnOpen.style.marginTop = "-50px";
        templateBtnOpen.style.fontWeight = "700";

        let instanceTitle = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceTitle.innerHTML = "Open booster";
        instanceTitle.style.fontSize = "30px";
        instanceTitle.style.fontWeight = "900";
        instanceTitle.style.marginLeft = "40px";
        instanceTitle.style.marginBottom = "40px";

        this._instanceContainer.appendChild(instanceTitle);
        this._instanceContainer.appendChild(instanceContainerListBooster)
        const booster = this._container.get(Booster.name);
        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            let boosterCard = new BoosterCard(container, world);
            let instanceContainerBooster = <HTMLElement> templateContainerBooster.cloneNode(true);
            instanceContainerBooster.onclick = () => this.selectingBooster(world);
            let instanceBtnOpen = <HTMLElement> templateBtnOpen.cloneNode(true);
            instanceBtnOpen.innerHTML = "x" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
            this._listDisplayNumberBoosterOwned.set(world, instanceBtnOpen);
            instanceContainerBooster.appendChild(boosterCard);
            instanceContainerBooster.appendChild(instanceBtnOpen);
            instanceContainerListBooster.appendChild(instanceContainerBooster);
        }));

        this._instanceContainerOpening = <HTMLElement> this.getCurrentDocument().createElement('div');
        //this._instanceContainerOpening.style.margin = "5px";
        //this._instanceContainerOpening.style.height = "300px";
        this._instanceContainerOpening.style.textAlign = "center";
        this._instanceContainerOpening.style.backgroundColor = "#828acd";
        this._instanceContainerOpening.style.margin = "70px 175px";
        this._instanceContainerOpening.style.padding = "20px";
        this._instanceContainerOpening.style.minHeight = "230px";
        this._instanceContainer.appendChild(this._instanceContainerOpening);
    }

    internalLoop(): void {
        this.updateNumberBoosterOwned();
    }

    selectingBooster(world: AbstractWorld)  {
        let booster: Booster = this._container.get(Booster.name);
        let number: number = booster.getNumberBoosterOwnedForWorld(world);
        let chat: Chat = this._container.get(Chat.name);
        if (number  >= 1) {
            let templateBtnOpenX = <HTMLElement> this.getCurrentDocument().createElement('div');
            templateBtnOpenX.style.backgroundColor = "#eb5554";
            templateBtnOpenX.style.color = "white";
            templateBtnOpenX.style.padding = "4px 2px";
            templateBtnOpenX.style.margin = "10px";
            templateBtnOpenX.style.cursor = "pointer";
            let instanceBtnOpen1 = <HTMLElement> templateBtnOpenX.cloneNode(true);
            instanceBtnOpen1.innerHTML = "Open 1 booster";
            instanceBtnOpen1.onclick = () => this.openingBooster(world, 1);
            let instanceBtnOpen10 = <HTMLElement> templateBtnOpenX.cloneNode(true);
            instanceBtnOpen10.innerHTML = "Open 10 boosters";
            instanceBtnOpen10.onclick = () => this.openingBooster(world, 10);
            let instanceBtnOpen100 = <HTMLElement> templateBtnOpenX.cloneNode(true);
            instanceBtnOpen100.innerHTML = "Open 100 boosters";
            instanceBtnOpen100.onclick = () => this.openingBooster(world, 100);

            this._instanceContainerOpening.innerHTML = "";
            let boosterCard = new BoosterCard(this._container, world);
            let subContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            let instanceTitleOpenCurrentBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
            instanceTitleOpenCurrentBooster.innerHTML = "Open booster";
            instanceTitleOpenCurrentBooster.style.fontSize = "20px";
            instanceTitleOpenCurrentBooster.style.fontWeight = "700";
            instanceTitleOpenCurrentBooster.style.marginBottom = "20px";

            let templateSubSubContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            templateSubSubContainer.style.display = "inline-block";
            templateSubSubContainer.style.width = "30%";
            templateSubSubContainer.style.verticalAlign = "top";

            let instanceLeft = <HTMLElement> templateSubSubContainer.cloneNode(true);
            let instanceRight = <HTMLElement> templateSubSubContainer.cloneNode(true);

            subContainer.appendChild(instanceTitleOpenCurrentBooster);
            subContainer.appendChild(instanceLeft);
            subContainer.appendChild(instanceRight);
            
            instanceLeft.appendChild(boosterCard);
            instanceRight.appendChild(instanceBtnOpen1);
            instanceRight.appendChild(instanceBtnOpen10);
            instanceRight.appendChild(instanceBtnOpen100);
            this._instanceContainerOpening.appendChild(subContainer);
        } else {
            chat.addChatMessage(
                F.sprintf(
                    "No booster <font style='font-weight:bold;'>%s</font> owned.",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        }
    }

    openingBooster(world: AbstractWorld, numberToOpen: number) {
        let booster: Booster = this._container.get(Booster.name);
        let chat: Chat = this._container.get(Chat.name);
        let numberOwned: number = booster.getNumberBoosterOwnedForWorld(world);

        if (numberOwned >= 1) {
            this._instanceContainerOpening.innerHTML = "";
            let toOpen: number = (numberOwned > numberToOpen) ?  numberToOpen : numberOwned;
            for (let i = 0; i < toOpen; i++) {
                let openedBoosterGraphicComponent: OpenedBoosterGraphicComponent = new OpenedBoosterGraphicComponent(
                    this._container,
                    world
                );
                this._instanceContainerOpening.appendChild(openedBoosterGraphicComponent);
            }
        } else {
            chat.addChatMessage(
                F.sprintf(
                    "No booster <font style='font-weight:bold;'>%s</font> owned",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        }
    }

    updateNumberBoosterOwned() {
        const booster = this._container.get(Booster.name);
        this._listDisplayNumberBoosterOwned.forEach((element:HTMLElement, world:AbstractWorld) => {
            element.innerHTML = "x " + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
        });
    }

}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;