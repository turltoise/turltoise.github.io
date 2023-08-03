var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CardListGraphicComponent_instances, _CardListGraphicComponent_setToAddBtn, _CardListGraphicComponent_setToRemoveBtn;
import Deck from "../../../Game/CardManager/Deck.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import CardSlotGraphicComponent from "./CardSlotGraphicComponent.js";
class CardListGraphicComponent extends AbstractGraphicComponent {
    constructor(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent) {
        super(container);
        _CardListGraphicComponent_instances.add(this);
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
        let sizeCard = cardList.size;
        let cardByLines = 5;
        let maxLines = Math.ceil(sizeCard / cardByLines);
        let cursorCard = 0;
        cardList.forEach((card, uuid) => {
            cursorCard++;
            const instanceContainerCard = templateCardContainer.cloneNode(true);
            const graphicCard = new CollectionCardGraphicComponent(this._container, card);
            graphicCard.onclick = () => collectionPanelGraphicComponent.showPreview(instancePreviewCard, card);
            const instanceBtnCollectionAction = this._templateBtnCollectionAction.cloneNode(true);
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
            const deck = this._container.get(Deck.name);
            if (deck.getCardList().has(uuid)) {
                __classPrivateFieldGet(this, _CardListGraphicComponent_instances, "m", _CardListGraphicComponent_setToRemoveBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
            else {
                __classPrivateFieldGet(this, _CardListGraphicComponent_instances, "m", _CardListGraphicComponent_setToAddBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
        });
        let slotToAdd = (maxLines * 5) - sizeCard;
        for (let i = 0; i < slotToAdd; i++) {
            const instanceSlot = new CardSlotGraphicComponent(container);
            instanceContainerCollectionCard.appendChild(instanceSlot);
        }
        this._instanceContainer.appendChild(instanceContainerGlobalCollection);
    }
    btnActionAddToDeck(card, divId) {
        const deck = this._container.get(Deck.name);
        const chat = this._container.get(Chat.name);
        if (!deck.addCard(card)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + deck.getMaxCard(), ChatMessage.ERROR());
            return;
        }
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CardListGraphicComponent_instances, "m", _CardListGraphicComponent_setToRemoveBtn).call(this, btn, card, divId);
        chat.addChatMessage("Card " + card._title + " add to deck.", ChatMessage.ADD());
    }
    btnActionRemoveFromDeck(card, divId) {
        const deck = this._container.get(Deck.name);
        const chat = this._container.get(Chat.name);
        deck.removeCard(card);
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CardListGraphicComponent_instances, "m", _CardListGraphicComponent_setToAddBtn).call(this, btn, card, divId);
        chat.addChatMessage("Card " + card._title + " remove from deck.", ChatMessage.REMOVE());
    }
}
_CardListGraphicComponent_instances = new WeakSet(), _CardListGraphicComponent_setToAddBtn = function _CardListGraphicComponent_setToAddBtn(e, card, divId) {
    e.parentElement.style.backgroundColor = "#CCDDCC";
    e.innerHTML = "✔️";
    e.title = "Add to deck";
    e.onclick = () => this.btnActionAddToDeck(card, divId);
}, _CardListGraphicComponent_setToRemoveBtn = function _CardListGraphicComponent_setToRemoveBtn(e, card, divId) {
    e.parentElement.style.backgroundColor = "#B25B21";
    e.innerHTML = "❌";
    e.title = "Remove from deck";
    e.onclick = () => this.btnActionRemoveFromDeck(card, divId);
};
customElements.define('card-list', CardListGraphicComponent);
export default CardListGraphicComponent;
//# sourceMappingURL=CardListGraphicComponent.js.map