import Container from "../../Container.js";
import Collection from "../../Game/CardManager/Collection.js";
import Deck from "../../Game/CardManager/Deck.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import CardGraphicComponent from "../CardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";

class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _templateContainerCard: HTMLElement;
    private _templateBtnCollectionAction: HTMLElement;

    constructor(container : Container) {
        super(container);

        this._instanceContainer.style.backgroundColor = "#C0C0C0";//"#0C5D20";//"#145f24";
        this._instanceContainer.style.backgroundImage = "url(./img/play-table.png)";

        this._instanceContainer.style.backgroundImage = "url(./img/arches.png)";

        this._instanceContainer.style.padding = "10px";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.userSelect = "none";

        const templateContainerCard = this.getCurrentDocument().createElement('div');
        templateContainerCard.setAttribute('class', this.getClassName('card-container'));
        templateContainerCard.style.backgroundColor = "#22AA33";
        templateContainerCard.style.borderRadius = "5px";
        templateContainerCard.style.display = "inline-block";
        templateContainerCard.style.margin = "5px";
        templateContainerCard.style.padding = "5px";
        this._templateContainerCard = templateContainerCard;

        const templateBtnCollectionAction = this.getCurrentDocument().createElement('div');
        templateBtnCollectionAction.setAttribute('class', this.getClassName('btn-action'));
        templateBtnCollectionAction.style.textAlign = "center";
        templateBtnCollectionAction.style.marginTop = "5px";
        templateBtnCollectionAction.style.cursor = "pointer";
        this._templateBtnCollectionAction = templateBtnCollectionAction;

        this.render();
    }

    render() {
        const collection: Collection = this._container.get('Collection');
        var cardList = collection.getCardList();
        cardList.forEach((card, uuid) => {
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            const graphicCard = new CardGraphicComponent(this._container, card);

            const instanceBtnCollectionAction = <HTMLElement> this._templateBtnCollectionAction.cloneNode(true);
            const divId = "btn-action-collection-" + uuid;
            instanceBtnCollectionAction.setAttribute("id", divId);

            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);
            this._instanceContainer.appendChild(instanceContainerCard);
            const deck: Deck = this._container.get('Deck');
            if (deck.getCardList().has(uuid)) {
                this.#setToRemoveBtn(instanceBtnCollectionAction, card, divId);
            } else {
                this.#setToAddBtn(instanceBtnCollectionAction, card, divId);
            }
            
            
        });
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
        const deck: Deck = this._container.get('Deck');
        const chat: Chat = this._container.get('Chat');
        if(!deck.addCard(card)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + deck.getMaxCard(), ChatMessage.ERROR());
            return;
        }
        const btn = this._shadowRoot.getElementById(divId);
        this.#setToRemoveBtn(btn, card, divId);
        chat.addChatMessage("Card "+card._title +" add to deck.", ChatMessage.ADD());
    }

    btnActionRemoveFromDeck(card, divId) {
        const deck: Deck = this._container.get('Deck');
        const chat: Chat = this._container.get('Chat');
        deck.removeCard(card);
        const btn = this._shadowRoot.getElementById(divId);
        this.#setToAddBtn(btn, card, divId);
        chat.addChatMessage("Card "+card._title +" remove from deck.", ChatMessage.REMOVE());
    }
}
customElements.define('collection-panel', CollectionPanelGraphicComponent);
export default CollectionPanelGraphicComponent;