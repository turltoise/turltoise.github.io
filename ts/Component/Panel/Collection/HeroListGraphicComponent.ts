import Container from "../../../Container.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
import Hero from "../../../Game/Card/Hero.js";
import Collection from "../../../Game/CardManager/Collection.js";
import Deck from "../../../Game/CardManager/Deck.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import CollectionPanelGraphicComponent from "../CollectionPanelGraphicComponent.js";
import AbstractListGraphicComponent from "./AbstractListGraphicComponent.js";

class HeroListGraphicComponent extends AbstractListGraphicComponent {
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

    internalLoop(): void {
        this.refreshXP();
    }

    refreshXP() {
        let collection : Collection = this._container.get(Collection.name);
        this._mapAdditionalContainer.forEach((container: HTMLElement, uuid: string) => {
            let hero: Hero = <Hero> collection.getCardFromUUID(uuid);
            container.innerHTML = hero.getXP()  + " / " + hero.getXPForNextLevel(); 
        });
    }

    displayBTN(uuid: string): void {
        const deck: Deck = this._container.get(Deck.name);
        if (deck.getCardList().has(uuid)) {
            this.setToRemoveBtn(uuid);
        } else {
            this.setToAddBtn(uuid);
        }
    }

    showPreview(card: CollectionCard) {
        this._collectionPanelGraphicComponent.showHeroPreview(this._instancePreviewCard, <Hero> card);
    }

    setToAddBtn(uuid: string) {
        let container = <HTMLElement> this._mapContainer.get(uuid);
        container.style.backgroundColor = "#CCDDCC";
        let btn = <HTMLElement> this._mapBtn.get(uuid);
        btn.innerHTML = "✔️";
        btn.title = "Add to deck";
        btn.onclick = () => this.btnActionAddToDeck(uuid);
    }

    setToRemoveBtn(uuid: string) {
        let container = <HTMLElement> this._mapContainer.get(uuid);
        container.style.backgroundColor = "#B25B21";
        let btn = <HTMLElement> this._mapBtn.get(uuid);
        btn.innerHTML = "❌";
        btn.title = "Remove from deck";
        btn.onclick = () => this.btnActionRemoveFromDeck(uuid);
    }

    btnActionAddToDeck(uuid: string) {
        let deck: Deck = this._container.get(Deck.name);
        let chat: Chat = this._container.get(Chat.name);
        let collection: Collection = this._container.get(Collection.name);
        let card: Hero = <Hero> collection.getCardFromUUID(uuid);
        if(!deck.addCard(card)) {
            chat.addChatMessage(
                "Max card in deck reached. Max is set to : " + deck.getMaxCard(),
                ChatMessage.COLLECTION()
            );
            return;
        }
        this.setToRemoveBtn(uuid);
        chat.addChatMessage(
            "Card " + card.getTitle() +" add to deck.",
            ChatMessage.COLLECTION()
        );
    }

    btnActionRemoveFromDeck(uuid: string) {
        const deck: Deck = this._container.get(Deck.name);
        const chat: Chat = this._container.get(Chat.name);
        let collection: Collection = this._container.get(Collection.name);
        let card: Hero = <Hero> collection.getCardFromUUID(uuid);
        deck.removeCard(card);
        this.setToAddBtn(uuid);
        chat.addChatMessage(
            "Card " + card.getTitle() +" remove from deck.",
            ChatMessage.COLLECTION()
        );
    }

}
customElements.define('hero-list', HeroListGraphicComponent);
export default HeroListGraphicComponent;