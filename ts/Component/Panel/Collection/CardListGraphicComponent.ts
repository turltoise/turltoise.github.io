import Container from "../../../Container.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
import Deck from "../../../Game/CardManager/Deck.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import CollectionPanelGraphicComponent from "../CollectionPanelGraphicComponent.js";
import CardSlotGraphicComponent from "./CardSlotGraphicComponent.js";

class CardListGraphicComponent extends AbstractGraphicComponent {
    private _templateBtnCollectionAction: HTMLElement;

    constructor(
        container: Container,
        title: string,
        cardList: Map<string, CollectionCard>,
        templateCardContainer: HTMLElement,
        instancePreviewCard: HTMLElement,
        collectionPanelGraphicComponent: CollectionPanelGraphicComponent
    ) {
        super(container);

        this._templateBtnCollectionAction = this.getCurrentDocument().createElement('div');
        this._templateBtnCollectionAction.setAttribute('class', this.getClassName('btn-action'));
        this._templateBtnCollectionAction.style.textAlign = "center";
        this._templateBtnCollectionAction.style.marginTop = "5px";
        this._templateBtnCollectionAction.style.cursor = "pointer";

        const instanceContainerGlobalCollection = this.getCurrentDocument().createElement('div');
        instanceContainerGlobalCollection.style.background = "linear-gradient(110deg, #388E3C 60%, #4CAF50 60%)";
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
            graphicCard.onclick = () => collectionPanelGraphicComponent.showPreview(instancePreviewCard, card);

            const instanceBtnCollectionAction = <HTMLElement> this._templateBtnCollectionAction.cloneNode(true);
            const divId = "btn-action-collection-" + uuid;
            instanceBtnCollectionAction.setAttribute("id", divId);

            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);

            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceSlot.appendChild(instanceContainerCard);
            instanceContainerCollectionCard.appendChild(instanceSlot);

            if (cursorCard >= 5) {
                const instanceLine = this.getCurrentDocument().createElement('div');
                instanceLine.style.width = "100%";
                instanceLine.style.height = "1px";
                instanceContainerCollectionCard.appendChild(instanceLine);
                cursorCard = 0;
            }

            const deck: Deck = this._container.get(Deck.name);
            if (deck.getCardList().has(uuid)) {
                this.#setToRemoveBtn(instanceBtnCollectionAction, card, divId);
            } else {
                this.#setToAddBtn(instanceBtnCollectionAction, card, divId);
            }
        });

        let slotToAdd: number = (maxLines * 5) - sizeCard;

        for (let i = 0; i < slotToAdd; i++) {
            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceContainerCollectionCard.appendChild(instanceSlot);
        }

        this._instanceContainer.appendChild(instanceContainerGlobalCollection);
    }

    #setToAddBtn(e, card, divId) {
        e.parentElement.style.backgroundColor = "#CCDDCC";
        e.innerHTML = "✔️";
        e.title = "Add to deck";
        e.onclick = () => this.btnActionAddToDeck(card, divId);
    }

    #setToRemoveBtn(e, card, divId) {
        e.parentElement.style.backgroundColor = "#B25B21";
        e.innerHTML = "❌";
        e.title = "Remove from deck";
        e.onclick = () => this.btnActionRemoveFromDeck(card, divId);
    }

    btnActionAddToDeck(card, divId) {
        const deck: Deck = this._container.get(Deck.name);
        const chat: Chat = this._container.get(Chat.name);
        if(!deck.addCard(card)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + deck.getMaxCard(), ChatMessage.ERROR());
            return;
        }
        const btn = this._shadowRoot.getElementById(divId);
        this.#setToRemoveBtn(btn, card, divId);
        chat.addChatMessage("Card "+card._title +" add to deck.", ChatMessage.ADD());
    }

    btnActionRemoveFromDeck(card, divId) {
        const deck: Deck = this._container.get(Deck.name);
        const chat: Chat = this._container.get(Chat.name);
        deck.removeCard(card);
        const btn = this._shadowRoot.getElementById(divId);
        this.#setToAddBtn(btn, card, divId);
        chat.addChatMessage("Card "+card._title +" remove from deck.", ChatMessage.REMOVE());
    }
}
customElements.define('card-list', CardListGraphicComponent);
export default CardListGraphicComponent;