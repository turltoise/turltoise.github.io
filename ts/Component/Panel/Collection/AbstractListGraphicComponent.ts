import Container from "../../../Container.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import CollectionPanelGraphicComponent from "../CollectionPanelGraphicComponent.js";
import CardSlotGraphicComponent from "./CardSlotGraphicComponent.js";

class AbstractListGraphicComponent extends AbstractGraphicComponent {
    protected _templateBtnCollectionAction: HTMLElement;
    protected _mapBtn: Map<string, HTMLElement>;
    protected _mapContainer: Map<string, HTMLElement>;
    protected _instancePreviewCard: HTMLElement;
    protected _collectionPanelGraphicComponent: CollectionPanelGraphicComponent;
    protected _mapAdditionalContainer: Map<string, HTMLElement>;

    constructor(
        container: Container,
        title: string,
        cardList: Map<string, CollectionCard>,
        templateCardContainer: HTMLElement,
        instancePreviewCard: HTMLElement,
        collectionPanelGraphicComponent: CollectionPanelGraphicComponent,
        background: string = "linear-gradient(110deg, #388E3C 60%, #4CAF50 60%)"
    ) {
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

        let sizeCard: number = cardList.size;
        let cardByLines: number = 5;
        let maxLines = Math.ceil(sizeCard / cardByLines);
        let cursorCard: number = 0;
        cardList.forEach((card: CollectionCard, uuid) => {
            cursorCard++;
            const instanceContainerCard = <HTMLElement> templateCardContainer.cloneNode(true);
            const graphicCard = new CollectionCardGraphicComponent(this._container, card);
            graphicCard.onclick = () => this.showPreview(card);

            const additionnalContainer = <HTMLElement> this._templateBtnCollectionAction.cloneNode(true);
            
            const instanceBtnCollectionAction = <HTMLElement> this._templateBtnCollectionAction.cloneNode(true);
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

        let slotToAdd: number = (maxLines * 5) - sizeCard;

        for (let i = 0; i < slotToAdd; i++) {
            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceContainerCollectionCard.appendChild(instanceSlot);
        }

        this._instanceContainer.appendChild(instanceContainerGlobalCollection);
    }

    displayBTN(uuid: string): void {return;}
    showPreview(card: CollectionCard): void {return;}
}
export default AbstractListGraphicComponent;