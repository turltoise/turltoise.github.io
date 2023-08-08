import Hero from "../../../Game/Card/Hero.js";
import HeroItemLinker from "../../../Game/Card/HeroItemLinker.js";
import Chest from "../../../Game/CardManager/Chest.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import AbstractListGraphicComponent from "./AbstractListGraphicComponent.js";
class ItemListGraphicComponent extends AbstractListGraphicComponent {
    constructor(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent) {
        super(container, title, cardList, templateCardContainer, instancePreviewCard, collectionPanelGraphicComponent, "linear-gradient(110deg, #B25B21 60%, #DC8734 60%)");
    }
    displayBTN(uuid) {
        let chest = this._container.get(Chest.name);
        let item = chest.getCardFromUUID(uuid);
        if (item.isHeroLinked()) {
            this.setToRemoveBtn(uuid);
        }
        else {
            this.setToAddBtn(uuid);
        }
    }
    showPreview(card) {
        this._collectionPanelGraphicComponent.showItemPreview(this._instancePreviewCard, card);
    }
    setToAddBtn(uuid) {
        let container = this._mapContainer.get(uuid);
        container.style.backgroundColor = "#CCDDCC";
        let btn = this._mapBtn.get(uuid);
        btn.innerHTML = "✔️";
        btn.title = "Add to current Hero";
        btn.onclick = () => this.btnActionAddToHero(uuid);
    }
    setToRemoveBtn(uuid) {
        let container = this._mapContainer.get(uuid);
        container.style.backgroundColor = "#B25B21";
        let btn = this._mapBtn.get(uuid);
        let chest = this._container.get(Chest.name);
        let item = chest.getCardFromUUID(uuid);
        btn.innerHTML = "❌ " + item.getHeroLinked().getTitle();
        btn.title = "Remove from Hero" + +item.getHeroLinked().getTitle();
        btn.onclick = () => this.btnActionRemoveFromHero(uuid);
    }
    btnActionAddToHero(uuid) {
        let chest = this._container.get(Chest.name);
        let chat = this._container.get(Chat.name);
        let itemCard = chest.getCardFromUUID(uuid);
        if (!HeroItemLinker.link(this._container, this._collectionPanelGraphicComponent.getCurrentHero(), itemCard)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + Hero.getMaxItem(), ChatMessage.COLLECTION());
            return;
        }
        this.setToRemoveBtn(uuid);
        chat.addChatMessage("Card " + itemCard.getTitle() + " add to current Hero.", ChatMessage.COLLECTION());
    }
    btnActionRemoveFromHero(uuid) {
        let chest = this._container.get(Chest.name);
        let chat = this._container.get(Chat.name);
        let itemCard = chest.getCardFromUUID(uuid);
        HeroItemLinker.unlink(this._container, this._collectionPanelGraphicComponent.getCurrentHero(), itemCard);
        this.setToAddBtn(uuid);
        chat.addChatMessage("Card " + itemCard.getTitle() + " remove from deck.", ChatMessage.COLLECTION());
    }
}
customElements.define('item-list', ItemListGraphicComponent);
export default ItemListGraphicComponent;
//# sourceMappingURL=ItemListGraphicComponent.js.map