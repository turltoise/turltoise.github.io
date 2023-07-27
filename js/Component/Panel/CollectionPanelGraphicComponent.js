var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CollectionPanelGraphicComponent_instances, _CollectionPanelGraphicComponent_setToAddBtn, _CollectionPanelGraphicComponent_setToRemoveBtn;
import Collection from "../../Game/CardManager/Collection.js";
import Deck from "../../Game/CardManager/Deck.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import CollectionCardGraphicComponent from "../Card/CollectionCardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        _CollectionPanelGraphicComponent_instances.add(this);
        this._instanceContainer.style.backgroundColor = "#C0C0C0"; //"#0C5D20";//"#145f24";
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
        const collection = this._container.get(Collection.name);
        var cardList = collection.getCardList();
        cardList.forEach((card, uuid) => {
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            const graphicCard = new CollectionCardGraphicComponent(this._container, card);
            const instanceBtnCollectionAction = this._templateBtnCollectionAction.cloneNode(true);
            const divId = "btn-action-collection-" + uuid;
            instanceBtnCollectionAction.setAttribute("id", divId);
            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);
            this._instanceContainer.appendChild(instanceContainerCard);
            const deck = this._container.get(Deck.name);
            if (deck.getCardList().has(uuid)) {
                __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToRemoveBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
            else {
                __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToAddBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
        });
    }
    btnActionAddToDeck(card, divId) {
        const deck = this._container.get(Deck.name);
        const chat = this._container.get(Chat.name);
        if (!deck.addCard(card)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + deck.getMaxCard(), ChatMessage.ERROR());
            return;
        }
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToRemoveBtn).call(this, btn, card, divId);
        chat.addChatMessage("Card " + card._title + " add to deck.", ChatMessage.ADD());
    }
    btnActionRemoveFromDeck(card, divId) {
        const deck = this._container.get(Deck.name);
        const chat = this._container.get(Chat.name);
        deck.removeCard(card);
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToAddBtn).call(this, btn, card, divId);
        chat.addChatMessage("Card " + card._title + " remove from deck.", ChatMessage.REMOVE());
    }
}
_CollectionPanelGraphicComponent_instances = new WeakSet(), _CollectionPanelGraphicComponent_setToAddBtn = function _CollectionPanelGraphicComponent_setToAddBtn(e, card, divId) {
    e.parentElement.style.backgroundColor = "#CCDDCC";
    e.innerHTML = "✔️";
    e.title = "Add to deck";
    e.onclick = () => this.btnActionAddToDeck(card, divId);
}, _CollectionPanelGraphicComponent_setToRemoveBtn = function _CollectionPanelGraphicComponent_setToRemoveBtn(e, card, divId) {
    e.parentElement.style.backgroundColor = "#B25B21";
    e.innerHTML = "❌";
    e.title = "Remove from deck";
    e.onclick = () => this.btnActionRemoveFromDeck(card, divId);
};
customElements.define('collection-panel', CollectionPanelGraphicComponent);
export default CollectionPanelGraphicComponent;
//# sourceMappingURL=CollectionPanelGraphicComponent.js.map