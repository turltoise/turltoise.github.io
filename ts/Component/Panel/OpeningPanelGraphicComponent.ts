import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _listDisplayNumberBoosterOwned: Map<AbstractWorld, HTMLElement>;
    
    constructor(container: Container) {
        super(container);

        this._listDisplayNumberBoosterOwned = new Map();

        this._instanceContainer.style.backgroundColor = "#A5ABDB";

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

        let templateBtnOpen = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBtnOpen.style.display = "inline-block";
        templateBtnOpen.style.boxShadow = "2px 4px #222";
		templateBtnOpen.style.backgroundColor = "#FDC911";
        templateBtnOpen.style.height = "30px";
        templateBtnOpen.style.lineHeight = "30px";
        templateBtnOpen.style.padding = "5px";
        templateBtnOpen.style.marginTop = "85px";
        templateBtnOpen.style.borderRadius = "2px";
        templateBtnOpen.style.cursor = "pointer";
        templateBtnOpen.style.userSelect = "none";
        templateBtnOpen.style.caretColor = "transparent";

        let self = this;
        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            const booster = this._container.get(Booster.name);
            let instanceContainerExtension: HTMLElement = <HTMLElement> templateContainerExtension.cloneNode(true);
            let instanceLeftContainer: HTMLElement = <HTMLElement> templateLeftContainer.cloneNode(true);
            let instanceRightContainer: HTMLElement = <HTMLElement> templateRightContainer.cloneNode(true);
            
            let instanceBtnOpen: HTMLElement = <HTMLElement> templateBtnOpen.cloneNode(true);
            instanceBtnOpen.onclick = () => alert(open);
            instanceBtnOpen.innerHTML = "Open booster (" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world)) + " owned)";
            this._listDisplayNumberBoosterOwned.set(world, instanceBtnOpen);

            instanceLeftContainer.appendChild(new BoosterCard(container, world));
            instanceRightContainer.appendChild(instanceBtnOpen);
            instanceContainerExtension.appendChild(instanceLeftContainer);
            instanceContainerExtension.appendChild(instanceRightContainer);
            this._instanceContainer.appendChild(instanceContainerExtension);
        }));
    }

    internalLoop(): void {
        this.updateNumberBoosterOwned();
    }

    updateNumberBoosterOwned() {
        const booster = this._container.get(Booster.name);
        this._listDisplayNumberBoosterOwned.forEach((element:HTMLElement, world:AbstractWorld) => {
            element.innerHTML = "Open booster (" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world)) + " owned)";
        });
    }

}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;