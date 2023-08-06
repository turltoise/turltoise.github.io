import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import CollectionCardGraphicComponent from "../Card/CollectionCardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        this._listDisplayNumberBoosterOwned = new Map();
        let worldList = container.get(WorldList.name);
        this._instanceContainer.style.backgroundColor = "#A5ABDB";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";
        let templateContainerBooster = this.getCurrentDocument().createElement('div');
        templateContainerBooster.style.display = "inline-block";
        templateContainerBooster.style.margin = "5px";
        let instanceContainerListBooster = this.getCurrentDocument().createElement('div');
        instanceContainerListBooster.style.textAlign = "center";
        let templateBtnOpen = this.getCurrentDocument().createElement('div');
        templateBtnOpen.style.display = "inline-block";
        templateBtnOpen.style.boxShadow = "2px 4px #222";
        templateBtnOpen.style.backgroundColor = "#FDC911";
        templateBtnOpen.style.padding = "5px";
        templateBtnOpen.style.borderRadius = "2px";
        templateBtnOpen.style.cursor = "pointer";
        templateBtnOpen.style.userSelect = "none";
        templateBtnOpen.style.caretColor = "transparent";
        let instanceTitle = this.getCurrentDocument().createElement('div');
        instanceTitle.innerHTML = "Opening booster";
        instanceTitle.style.fontSize = "30px";
        instanceTitle.style.fontWeight = "900";
        instanceTitle.style.marginLeft = "40px";
        instanceTitle.style.marginBottom = "40px";
        this._instanceContainer.appendChild(instanceTitle);
        this._instanceContainer.appendChild(instanceContainerListBooster);
        const booster = this._container.get(Booster.name);
        worldList.getList().forEach(((world, position) => {
            let boosterCard = new BoosterCard(container, world);
            let instanceContainerBooster = templateContainerBooster.cloneNode(true);
            instanceContainerBooster.onclick = () => this.selectingBooster(world);
            let instanceBtnOpen = templateBtnOpen.cloneNode(true);
            instanceBtnOpen.innerHTML = "x" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
            this._listDisplayNumberBoosterOwned.set(world, instanceBtnOpen);
            instanceContainerBooster.appendChild(boosterCard);
            instanceContainerBooster.appendChild(instanceBtnOpen);
            instanceContainerListBooster.appendChild(instanceContainerBooster);
        }));
        this._instanceContainerOpening = this.getCurrentDocument().createElement('div');
        this._instanceContainerOpening.style.margin = "5px";
        this._instanceContainerOpening.style.height = "300px";
        this._instanceContainerOpening.style.textAlign = "center";
        this._instanceContainer.appendChild(this._instanceContainerOpening);
    }
    internalLoop() {
        this.updateNumberBoosterOwned();
    }
    selectingBooster(world) {
        this._instanceContainerOpening.innerHTML = "";
        let boosterCard = new BoosterCard(this._container, world);
        let subContainer = this.getCurrentDocument().createElement('div');
        subContainer.style.display = "inline-block";
        subContainer.style.marginTop = "40px";
        let instanceTitleOpenCurrentBooster = this.getCurrentDocument().createElement('div');
        instanceTitleOpenCurrentBooster.innerHTML = "Open booster";
        instanceTitleOpenCurrentBooster.style.fontSize = "20px";
        instanceTitleOpenCurrentBooster.style.fontWeight = "700";
        instanceTitleOpenCurrentBooster.style.marginBottom = "20px";
        boosterCard.onclick = () => this.openingBooster(world);
        subContainer.appendChild(instanceTitleOpenCurrentBooster);
        subContainer.appendChild(boosterCard);
        this._instanceContainerOpening.appendChild(subContainer);
    }
    openingBooster(world) {
        this._instanceContainerOpening.innerHTML = "";
        let rewardList = new Map([...world.getHeroList(), ...world.getItemList()]);
        let keys = Array.from(rewardList.keys());
        let className1 = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
        let collectionCard1 = eval(`new ${className1}()`);
        let className2 = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
        let collectionCard2 = eval(`new ${className2}()`);
        let className3 = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
        let collectionCard3 = eval(`new ${className3}()`);
        const graphicCard1 = new CollectionCardGraphicComponent(this._container, collectionCard1);
        const graphicCard2 = new CollectionCardGraphicComponent(this._container, collectionCard2);
        const graphicCard3 = new CollectionCardGraphicComponent(this._container, collectionCard3);
        this._instanceContainerOpening.appendChild(graphicCard1);
        this._instanceContainerOpening.appendChild(graphicCard2);
        this._instanceContainerOpening.appendChild(graphicCard3);
    }
    updateNumberBoosterOwned() {
        const booster = this._container.get(Booster.name);
        this._listDisplayNumberBoosterOwned.forEach((element, world) => {
            element.innerHTML = "x" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
        });
    }
}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;
//# sourceMappingURL=OpeningPanelGraphicComponent.js.map