import Hero from "../../../Game/Card/Hero.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import PreviewCaracGraphicComponent from "./CardPreview/PreviewCaracGraphicComponent.js";
import CardSlotGraphicComponent from "./CardSlotGraphicComponent.js";
class HeroPreviewGraphicComponent extends AbstractGraphicComponent {
    constructor(container, card, templateContainerCard) {
        super(container);
        this._card = card;
        this._templateContainerCard = templateContainerCard;
        this._instanceContainer.style.width = "100%";
        this._instanceContainer.style.background = "linear-gradient(110deg, #388E3C 60%, #4CAF50 60%)";
        this._instanceContainer.style.display = "inline-block";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.padding = "20px";
        this._instanceContainer.style.borderRadius = "5px";
        let instanceTitlePreview = this.getCurrentDocument().createElement('div');
        instanceTitlePreview.innerHTML = "Character sheet";
        instanceTitlePreview.style.fontSize = "20px";
        instanceTitlePreview.style.textAlign = "left";
        instanceTitlePreview.style.marginBottom = "20px";
        instanceTitlePreview.style.fontWeight = "bold";
        instanceTitlePreview.style.color = "white";
        let instanceContainerMainData = this.getCurrentDocument().createElement('div');
        instanceContainerMainData.style.width = "45%";
        instanceContainerMainData.style.display = "inline-block";
        instanceContainerMainData.style.verticalAlign = "top";
        let instanceContainerCenter = this.getCurrentDocument().createElement('div');
        instanceContainerCenter.style.width = "10%";
        instanceContainerCenter.style.display = "inline-block";
        instanceContainerCenter.style.verticalAlign = "top";
        let instanceContainerSecondaryData = this.getCurrentDocument().createElement('div');
        instanceContainerSecondaryData.style.width = "45%";
        instanceContainerSecondaryData.style.display = "inline-block";
        instanceContainerSecondaryData.style.verticalAlign = "top";
        let templateTitleRubric = this.getCurrentDocument().createElement('div');
        templateTitleRubric.style.fontSize = "16px";
        templateTitleRubric.style.textAlign = "left";
        templateTitleRubric.style.marginBottom = "20px";
        templateTitleRubric.style.fontWeight = "bold";
        templateTitleRubric.style.color = "white";
        templateTitleRubric.style.padding = "5px 0px";
        templateTitleRubric.style.boxShadow = "0px 2px rgba(255,255,255,0.8)";
        let instanceTitleCapacities = templateTitleRubric.cloneNode(true);
        instanceTitleCapacities.innerHTML = "Capacities";
        let instanceContainerCapacities = this.getCurrentDocument().createElement('div');
        instanceContainerCapacities.style.textAlign = "left";
        instanceContainerCapacities.style.marginBottom = "40px";
        let instanceTitleItems = templateTitleRubric.cloneNode(true);
        instanceTitleItems.innerHTML = "Items";
        this._itemListContainer = this.getCurrentDocument().createElement('div');
        this._itemListContainer.style.textAlign = "center";
        this._itemListContainer.style.marginBottom = "40px";
        this._instanceContainer.appendChild(instanceTitlePreview);
        this._instanceContainer.appendChild(instanceContainerMainData);
        this._instanceContainer.appendChild(instanceContainerCenter);
        this._instanceContainer.appendChild(instanceContainerSecondaryData);
        this._instanceContainer.appendChild(instanceTitleCapacities);
        this._instanceContainer.appendChild(instanceContainerCapacities);
        this._instanceContainer.appendChild(instanceTitleItems);
        this._instanceContainer.appendChild(this._itemListContainer);
        let instanceCardontainer = this.getCurrentDocument().createElement('div');
        instanceCardontainer.style.display = "inline-block";
        instanceCardontainer.style.marginTop = "50px";
        const graphicCard = new CollectionCardGraphicComponent(this._container, this._card);
        instanceCardontainer.appendChild(graphicCard);
        instanceContainerMainData.appendChild(instanceCardontainer);
        let instanceHackCardInMiddle = this.getCurrentDocument().createElement('div');
        instanceHackCardInMiddle.style.height = "50px";
        instanceHackCardInMiddle.style.width = "100%";
        instanceContainerMainData.appendChild(instanceHackCardInMiddle);
        let templateBlockSeperateSecondaryData = this.getCurrentDocument().createElement('div');
        templateBlockSeperateSecondaryData.style.height = "20px";
        instanceContainerMainData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Strength'));
        instanceContainerMainData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Dexterity'));
        instanceContainerMainData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Intelligence'));
        instanceContainerMainData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Luck'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Damage'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Critical Rate'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Critical Number'));
        let instanceBlockSeperateSecondaryData1 = templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData1);
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Damage'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Critical Rate'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Critical Number'));
        let instanceBlockSeperateSecondaryData2 = templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData2);
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Fire Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Water Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Plant Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Necromancy Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Necromancy Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Armor'));
        let instanceBlockSeperateSecondaryData3 = templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData3);
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Accuracy'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Escape'));
        let instanceBlockSeperateSecondaryData4 = templateBlockSeperateSecondaryData.cloneNode(true);
        instanceContainerSecondaryData.appendChild(instanceBlockSeperateSecondaryData4);
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Life'));
        this._card.getCapacities().forEach((capacity) => {
            let capacityContainer = this.getCurrentDocument().createElement('div');
            capacityContainer.appendChild(capacity.getGraphic());
            instanceContainerCapacities.appendChild(capacityContainer);
        });
        this.displayItemList();
    }
    internalLoop() {
        this.displayItemList();
    }
    displayItemList() {
        this._itemListContainer.innerHTML = "";
        let cursorCard = 0;
        this._card.getItemMap().forEach((item) => {
            cursorCard++;
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            const instanceSlot = new CardSlotGraphicComponent(this._container);
            const graphicCard = new CollectionCardGraphicComponent(this._container, item);
            instanceContainerCard.appendChild(graphicCard);
            //instanceContainerCard.appendChild(instanceBtnCollectionAction);
            instanceSlot.appendChild(instanceContainerCard);
            this._itemListContainer.appendChild(instanceSlot);
        });
        let slotToAdd = Hero.getMaxItem() - cursorCard;
        for (let i = 0; i < slotToAdd; i++) {
            const instanceSlot = new CardSlotGraphicComponent(this._container);
            this._itemListContainer.appendChild(instanceSlot);
        }
    }
}
customElements.define('hero-preview', HeroPreviewGraphicComponent);
export default HeroPreviewGraphicComponent;
//# sourceMappingURL=HeroPreviewGraphicComponent.js.map