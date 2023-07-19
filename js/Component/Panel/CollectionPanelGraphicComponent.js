var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CollectionPanelGraphicComponent_instances, _CollectionPanelGraphicComponent_setToAddBtn, _CollectionPanelGraphicComponent_setToRemoveBtn;
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import CardGraphicComponent from "../CardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(state) {
        super(state);
        _CollectionPanelGraphicComponent_instances.add(this);
        this._state = state;
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
        var cardList = this._state.getCollection().getCardList();
        cardList.forEach((card, uuid) => {
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            const graphicCard = new CardGraphicComponent(this._state, card);
            const instanceBtnCollectionAction = this._templateBtnCollectionAction.cloneNode(true);
            const divId = "btn-action-collection-" + uuid;
            instanceBtnCollectionAction.setAttribute("id", divId);
            instanceContainerCard.appendChild(graphicCard);
            instanceContainerCard.appendChild(instanceBtnCollectionAction);
            this._instanceContainer.appendChild(instanceContainerCard);
            if (this._state.getDeck().getCardList().has(uuid)) {
                __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToRemoveBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
            else {
                __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToAddBtn).call(this, instanceBtnCollectionAction, card, divId);
            }
        });
    }
    btnActionAddToDeck(card, divId) {
        if (!this._state.getDeck().addCard(card)) {
            this._state.addChatMessage("Max card in deck reached. Max is set to : " + this._state.getDeck().getMaxCard(), ChatMessage.ERROR());
            return;
        }
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToRemoveBtn).call(this, btn, card, divId);
        this._state.addChatMessage("Card " + card._title + " add to deck.", ChatMessage.ADD());
    }
    btnActionRemoveFromDeck(card, divId) {
        this._state.getDeck().removeCard(card);
        const btn = this._shadowRoot.getElementById(divId);
        __classPrivateFieldGet(this, _CollectionPanelGraphicComponent_instances, "m", _CollectionPanelGraphicComponent_setToAddBtn).call(this, btn, card, divId);
        this._state.addChatMessage("Card " + card._title + " remove from deck.", ChatMessage.REMOVE());
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