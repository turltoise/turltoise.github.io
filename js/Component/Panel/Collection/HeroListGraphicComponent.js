import Collection from "../../../Game/CardManager/Collection.js";
import Deck from "../../../Game/CardManager/Deck.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import AbstractListGraphicComponent from "./AbstractListGraphicComponent.js";
class HeroListGraphicComponent extends AbstractListGraphicComponent {
    constructor(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent) {
        super(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent, "linear-gradient(110deg, #B25B21 60%, #DC8734 60%)");
    }
    internalLoop() {
        this.refreshXP();
    }
    refreshXP() {
        let collection = this._container.get(Collection.name);
        this._mapAdditionalContainer.forEach((container, uuid) => {
            let hero = collection.getCardFromUUID(uuid);
            container.innerHTML = hero.getXP() + " / " + hero.getXPForNextLevel();
        });
    }
    displayBTN(uuid) {
        const deck = this._container.get(Deck.name);
        if (deck.getCardList().has(uuid)) {
            this.setToRemoveBtn(uuid);
        }
        else {
            this.setToAddBtn(uuid);
        }
    }
    showPreview(card) {
        this._collectionPanelGraphicComponent.showHeroPreview(this._instancePreviewCard, card);
    }
    setToAddBtn(uuid) {
        let container = this._mapContainer.get(uuid);
        container.style.backgroundColor = "#CCDDCC";
        let btn = this._mapBtn.get(uuid);
        btn.innerHTML = "✔️";
        btn.title = "Add to deck";
        btn.onclick = () => this.btnActionAddToDeck(uuid);
    }
    setToRemoveBtn(uuid) {
        let container = this._mapContainer.get(uuid);
        container.style.backgroundColor = "#B25B21";
        let btn = this._mapBtn.get(uuid);
        btn.innerHTML = "❌";
        btn.title = "Remove from deck";
        btn.onclick = () => this.btnActionRemoveFromDeck(uuid);
    }
    btnActionAddToDeck(uuid) {
        let deck = this._container.get(Deck.name);
        let chat = this._container.get(Chat.name);
        let collection = this._container.get(Collection.name);
        let card = collection.getCardFromUUID(uuid);
        if (!deck.addCard(card)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + deck.getMaxCard(), ChatMessage.COLLECTION());
            return;
        }
        this.setToRemoveBtn(uuid);
        chat.addChatMessage("Card " + card.getTitle() + " add to deck.", ChatMessage.COLLECTION());
    }
    btnActionRemoveFromDeck(uuid) {
        const deck = this._container.get(Deck.name);
        const chat = this._container.get(Chat.name);
        let collection = this._container.get(Collection.name);
        let card = collection.getCardFromUUID(uuid);
        deck.removeCard(card);
        this.setToAddBtn(uuid);
        chat.addChatMessage("Card " + card.getTitle() + " remove from deck.", ChatMessage.COLLECTION());
    }
}
customElements.define('hero-list', HeroListGraphicComponent);
export default HeroListGraphicComponent;
//# sourceMappingURL=HeroListGraphicComponent.js.map