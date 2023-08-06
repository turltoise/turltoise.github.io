import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import CardSlotGraphicComponent from "./CardSlotGraphicComponent.js";
class AbstractListGraphicComponent extends AbstractGraphicComponent {
    constructor(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent, background = "linear-gradient(110deg, #388E3C 60%, #4CAF50 60%)") {
        super(container);
        this._mapBtn = new Map();
        this._mapContainer = new Map();
        this._mapAdditionalContainer = new Map();
        this._instancePreviewCard = instancePreviewCard;
        this._collectionPanelGraphicComponent = collectionPanelGraphicComponent;
        this._templateBtnCollectionAction = this.getCurrentDocument().createElement('div');
        this._templateBtnCollectionAction.setAttribute('class', this.getClassName('btn-action'));
        this._templateBtnCollectionAction.style.textAlign = "center";
        this._templateBtnCollectionAction.style.marginTop = "5px";
        this._templateBtnCollectionAction.style.cursor = "pointer";
        const instanceContainerGlobalCollection = this.getCurrentDocument().createElement('div');
        instanceContainerGlobalCollection.style.background = background;
        instanceContainerGlobalCollection.style.marginBottom = "20px";
        instanceContainerGlobalCollection.style.padding = "20px";
        instanceContainerGlobalCollection.style.borderRadius = "3px";
        const instanceContainerCollectionCard = this.getCurrentDocument().createElement('div');
        const instanceCollectionTitle = this.getCurrentDocument().createElement('div');
        instanceCollectionTitle.innerHTML = title;
        instanceCollectionTitle.style.textAlign = "left";
        instanceCollectionTitle.style.fontSize = "20px";
        instanceCollectionTitle.style.height = "50px";
        instanceCollectionTitle.style.color = "white";
        instanceContainerGlobalCollection.appendChild(instanceCollectionTitle);
        instanceContainerGlobalCollection.appendChild(instanceContainerCollectionCard);
        let sizeCard = cardList.size;
        let cardByLines = 5;
        let maxLines = Math.ceil(sizeCard / cardByLines);
        let cursorCard = 0;
        cardList.forEach((card, uuid) => {
            cursorCard++;
            const instanceContainerCard = templateCardContainer.cloneNode(true);
            const graphicCard = new CollectionCardGraphicComponent(this._container, card);
            graphicCard.onclick = () => this.showPreview(card);
            const additionnalContainer = this._templateBtnCollectionAction.cloneNode(true);
            const instanceBtnCollectionAction = this._templateBtnCollectionAction.cloneNode(true);
            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(additionnalContainer);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);
            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceSlot.appendChild(instanceContainerCard);
            instanceContainerCollectionCard.appendChild(instanceSlot);
            if (cursorCard >= cardByLines) {
                const instanceLine = this.getCurrentDocument().createElement('div');
                instanceLine.style.width = "100%";
                instanceLine.style.height = "1px";
                instanceContainerCollectionCard.appendChild(instanceLine);
                cursorCard = 0;
            }
            this._mapBtn.set(card.getUUID(), instanceBtnCollectionAction);
            this._mapContainer.set(card.getUUID(), instanceBtnCollectionAction);
            this._mapAdditionalContainer.set(card.getUUID(), additionnalContainer);
            this.displayBTN(card.getUUID());
        });
        let slotToAdd = (maxLines * 5) - sizeCard;
        for (let i = 0; i < slotToAdd; i++) {
            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceContainerCollectionCard.appendChild(instanceSlot);
        }
        this._instanceContainer.appendChild(instanceContainerGlobalCollection);
    }
    displayBTN(uuid) { return; }
    showPreview(card) { return; }
}
export default AbstractListGraphicComponent;
//# sourceMappingURL=AbstractListGraphicComponent.js.map