import Container from "../../../Container.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
import Hero from "../../../Game/Card/Hero.js";
import HeroItemLinker from "../../../Game/Card/HeroItemLinker.js";
import Item from "../../../Game/Card/Item.js";
import Chest from "../../../Game/CardManager/Chest.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import CollectionPanelGraphicComponent from "../CollectionPanelGraphicComponent.js";
import AbstractListGraphicComponent from "./AbstractListGraphicComponent.js";

class ItemListGraphicComponent extends AbstractListGraphicComponent {
    constructor(
        container: Container,
        title: string,
        cardList: Map<string, CollectionCard>,
        templateCardContainer: HTMLElement,
        instancePreviewCard: HTMLElement,
        collectionPanelGraphicComponent: CollectionPanelGraphicComponent
    ) {
        super(   
            container,
            title,
            cardList,
            templateCardContainer,
            instancePreviewCard,
            collectionPanelGraphicComponent,
            "linear-gradient(110deg, #B25B21 60%, #DC8734 60%)"
        );
    }

    displayBTN(uuid: string): void {
        let chest: Chest = this._container.get(Chest.name);
        let item: Item = <Item> chest.getCardFromUUID(uuid);
        if (item.isHeroLinked()) {
            this.setToRemoveBtn(uuid);
        } else {
            this.setToAddBtn(uuid);
        }
    }

    showPreview(card: CollectionCard) { // TODO to rework
        this._collectionPanelGraphicComponent.showItemPreview(this._instancePreviewCard, <Item> card);
    }

    setToAddBtn(uuid: string) {
        let container = <HTMLElement> this._mapContainer.get(uuid);
        container.style.backgroundColor = "#CCDDCC";
        let btn = <HTMLElement> this._mapBtn.get(uuid);
        btn.innerHTML = "✔️";
        btn.title = "Add to current Hero";
        btn.onclick = () => this.btnActionAddToHero(uuid);
    }

    setToRemoveBtn(uuid: string) {
        let container = <HTMLElement> this._mapContainer.get(uuid);
        container.style.backgroundColor = "#B25B21";
        let btn = <HTMLElement> this._mapBtn.get(uuid);
        let chest: Chest = this._container.get(Chest.name);
        let item: Item = <Item> chest.getCardFromUUID(uuid);
        btn.innerHTML = "❌ " + item.getHeroLinked().getTitle();
        btn.title = "Remove from Hero" + + item.getHeroLinked().getTitle();
        btn.onclick = () => this.btnActionRemoveFromHero(uuid);
    }

    btnActionAddToHero(uuid: string) {
        let chest: Chest = this._container.get(Chest.name);
        let chat: Chat = this._container.get(Chat.name);
        let itemCard: Item = <Item> chest.getCardFromUUID(uuid);
        if(!HeroItemLinker.link(this._container, this._collectionPanelGraphicComponent.getCurrentHero(), itemCard)) {
            chat.addChatMessage("Max card in deck reached. Max is set to : " + Hero.getMaxItem(), ChatMessage.ERROR());
            return;
        }
        this.setToRemoveBtn(uuid);
        chat.addChatMessage("Card " + itemCard.getTitle() +" add to current Hero.", ChatMessage.ADD());
    }

    btnActionRemoveFromHero(uuid: string) {
        let chest: Chest = this._container.get(Chest.name);
        let chat: Chat = this._container.get(Chat.name);
        let itemCard: Item = <Item> chest.getCardFromUUID(uuid);
        HeroItemLinker.unlink(this._container, this._collectionPanelGraphicComponent.getCurrentHero(), itemCard)
        this.setToAddBtn(uuid);
        chat.addChatMessage("Card " + itemCard.getTitle() +" remove from deck.", ChatMessage.REMOVE());
    }
}
customElements.define('item-list', ItemListGraphicComponent);
export default ItemListGraphicComponent;