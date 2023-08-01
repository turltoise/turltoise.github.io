import Container from "../../Container.js";
import CardGraphicSetting from "../../Game/Card/CardGraphicSetting.js";
import CollectionCard from "../../Game/Card/CollectionCard.js";
import Collection from "../../Game/CardManager/Collection.js";
import Deck from "../../Game/CardManager/Deck.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import CollectionCardGraphicComponent from "../Card/CollectionCardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CardPreviewGraphicComponent from "./Collection/CardPreviewGraphicComponent.js";

class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _templateContainerCard: HTMLElement;
    private _templateBtnCollectionAction: HTMLElement;
    private _cardPreview: HTMLElement;
    private _instancePreviewCard: HTMLElement;

    constructor(container : Container) {
        super(container);

        this._instanceContainer.style.backgroundColor = "#C0C0C0";//"#0C5D20";//"#145f24";
        this._instanceContainer.style.backgroundImage = "url(./img/play-table.png)";

        this._instanceContainer.style.backgroundImage = "url(./img/arches.png)";

        this._instanceContainer.style.padding = "10px";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.userSelect = "none";

        this._templateContainerCard = this.getCurrentDocument().createElement('div');
        this._templateContainerCard.setAttribute('class', this.getClassName('card-container'));
        this._templateContainerCard.style.backgroundColor = "#22AA33";
        this._templateContainerCard.style.borderRadius = "5px";
        this._templateContainerCard.style.display = "inline-block";
        this._templateContainerCard.style.margin = "5px";
        this._templateContainerCard.style.padding = "5px";

        this._templateBtnCollectionAction = this.getCurrentDocument().createElement('div');
        this._templateBtnCollectionAction.setAttribute('class', this.getClassName('btn-action'));
        this._templateBtnCollectionAction.style.textAlign = "center";
        this._templateBtnCollectionAction.style.marginTop = "5px";
        this._templateBtnCollectionAction.style.cursor = "pointer";

        const collection: Collection = this._container.get(Collection.name);
        var cardList = collection.getCardList();

        this._instancePreviewCard = this.getCurrentDocument().createElement('div');
        this._instancePreviewCard.style.display = "inline-block";
        this._instancePreviewCard.style.width = "50%";
        this._instancePreviewCard.style.verticalAlign = "top";
        this._instanceContainer.appendChild(this._instancePreviewCard);
        this._cardPreview = new CardPreviewGraphicComponent(this._container, collection.getFirst());
        this._instancePreviewCard.appendChild(this._cardPreview);

        const instanceListingCard = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceListingCard);
        instanceListingCard.style.display = "inline-block";
        instanceListingCard.style.width = "50%";
        instanceListingCard.style.verticalAlign = "top";

        cardList.forEach((card: CollectionCard, uuid) => {
            const instanceContainerCard = <HTMLElement> this._templateContainerCard.cloneNode(true);
            const graphicCard = new CollectionCardGraphicComponent(this._container, card);
            graphicCard.onclick = () => this.#showPreview(this._instancePreviewCard, card);

            const instanceBtnCollectionAction = <HTMLElement> this._templateBtnCollectionAction.cloneNode(true);
            const divId = "btn-action-collection-" + uuid;
            instanceBtnCollectionAction.setAttribute("id", divId);

            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);
            instanceListingCard.appendChild(instanceContainerCard);

            const deck: Deck = this._container.get(Deck.name);
            if (deck.getCardList().has(uuid)) {
                this.#setToRemoveBtn(instanceBtnCollectionAction, card, divId);
            } else {
                this.#setToAddBtn(instanceBtnCollectionAction, card, divId);
            }
        });
    }

    #showPreview(container:HTMLElement, card: CollectionCard) {
        container.innerHTML = "";
        let preview = new CardPreviewGraphicComponent(this._container, card);
        container.appendChild(preview);
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
customElements.define('collection-panel', CollectionPanelGraphicComponent);
export default CollectionPanelGraphicComponent;