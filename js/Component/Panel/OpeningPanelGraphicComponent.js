import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import RewardComputer from "../../Game/Card/RewardComputer.js";
import Hero from "../../Game/Card/Hero.js";
import Item from "../../Game/Card/Item.js";
import Chest from "../../Game/CardManager/Chest.js";
import Deck from "../../Game/CardManager/Deck.js";
import Chat from "../../Game/Chat/Chat.js";
import Number from "../../Game/Tools/Number.js";
import BoosterCard from "../Card/BoosterCard.js";
import CollectionCardGraphicComponent from "../Card/CollectionCardGraphicComponent.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CollectionPanelGraphicComponent from "./CollectionPanelGraphicComponent.js";
import F from "../../Game/Tools/F.js";
import ItemRarity from "../../Game/Card/ItemRarity.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
class OpeningPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        this._listDisplayNumberBoosterOwned = new Map();
        let worldList = container.get(WorldList.name);
        this._instanceContainer.style.backgroundColor = "#A5ABDB";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";
        let templateContainerBooster = this.getCurrentDocument().createElement('div');
        templateContainerBooster.style.display = "inline-block";
        templateContainerBooster.style.margin = "5px";
        let instanceContainerListBooster = this.getCurrentDocument().createElement('div');
        instanceContainerListBooster.style.textAlign = "center";
        let templateBtnOpen = this.getCurrentDocument().createElement('div');
        templateBtnOpen.style.display = "block";
        templateBtnOpen.style.background = "linear-gradient(to left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.5) 100%)";
        templateBtnOpen.style.backgroundColor = "#eb5554";
        templateBtnOpen.style.color = "white";
        templateBtnOpen.style.padding = "5px";
        templateBtnOpen.style.cursor = "pointer";
        templateBtnOpen.style.userSelect = "none";
        templateBtnOpen.style.caretColor = "transparent";
        templateBtnOpen.style.marginTop = "-50px";
        templateBtnOpen.style.fontWeight = "700";
        let instanceTitle = this.getCurrentDocument().createElement('div');
        instanceTitle.innerHTML = "Opening booster";
        instanceTitle.style.fontSize = "30px";
        instanceTitle.style.fontWeight = "900";
        instanceTitle.style.marginLeft = "40px";
        instanceTitle.style.marginBottom = "40px";
        this._instanceContainer.appendChild(instanceTitle);
        this._instanceContainer.appendChild(instanceContainerListBooster);
        const booster = this._container.get(Booster.name);
        worldList.getList().forEach(((world, position) => {
            let boosterCard = new BoosterCard(container, world);
            let instanceContainerBooster = templateContainerBooster.cloneNode(true);
            instanceContainerBooster.onclick = () => this.selectingBooster(world);
            let instanceBtnOpen = templateBtnOpen.cloneNode(true);
            instanceBtnOpen.innerHTML = "x" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
            this._listDisplayNumberBoosterOwned.set(world, instanceBtnOpen);
            instanceContainerBooster.appendChild(boosterCard);
            instanceContainerBooster.appendChild(instanceBtnOpen);
            instanceContainerListBooster.appendChild(instanceContainerBooster);
        }));
        this._instanceContainerOpening = this.getCurrentDocument().createElement('div');
        this._instanceContainerOpening.style.margin = "5px";
        this._instanceContainerOpening.style.height = "300px";
        this._instanceContainerOpening.style.textAlign = "center";
        this._instanceContainer.appendChild(this._instanceContainerOpening);
    }
    internalLoop() {
        this.updateNumberBoosterOwned();
    }
    selectingBooster(world) {
        let booster = this._container.get(Booster.name);
        let number = booster.getNumberBoosterOwnedForWorld(world);
        let chat = this._container.get(Chat.name);
        if (number >= 1) {
            this._instanceContainerOpening.innerHTML = "";
            let boosterCard = new BoosterCard(this._container, world);
            let subContainer = this.getCurrentDocument().createElement('div');
            subContainer.style.display = "inline-block";
            subContainer.style.marginTop = "40px";
            let instanceTitleOpenCurrentBooster = this.getCurrentDocument().createElement('div');
            instanceTitleOpenCurrentBooster.innerHTML = "Open booster (#TODO open 1 - 10 - 100)";
            instanceTitleOpenCurrentBooster.style.fontSize = "20px";
            instanceTitleOpenCurrentBooster.style.fontWeight = "700";
            instanceTitleOpenCurrentBooster.style.marginBottom = "20px";
            boosterCard.onclick = () => this.openingBooster(world);
            subContainer.appendChild(instanceTitleOpenCurrentBooster);
            subContainer.appendChild(boosterCard);
            this._instanceContainerOpening.appendChild(subContainer);
        }
        else {
            chat.addChatMessage("No booster " + world.getName() + " owned.", ChatMessage.BOOSTER());
        }
    }
    openingBooster(world) {
        let booster = this._container.get(Booster.name);
        let chest = this._container.get(Chest.name);
        let deck = this._container.get(Deck.name);
        let chat = this._container.get(Chat.name);
        let itemRarity = this._container.get(ItemRarity.name);
        let number = booster.getNumberBoosterOwnedForWorld(world);
        if (number >= 1) {
            this._instanceContainerOpening.innerHTML = "";
            let subContainer = this.getCurrentDocument().createElement('div');
            subContainer.style.display = "inline-block";
            subContainer.style.marginTop = "40px";
            let instanceTitleOpenCurrentBooster = this.getCurrentDocument().createElement('div');
            instanceTitleOpenCurrentBooster.innerHTML = "Cards obtained";
            instanceTitleOpenCurrentBooster.style.fontSize = "20px";
            instanceTitleOpenCurrentBooster.style.fontWeight = "700";
            instanceTitleOpenCurrentBooster.style.marginBottom = "20px";
            subContainer.appendChild(instanceTitleOpenCurrentBooster);
            let cardList = RewardComputer.generate(this._container, world);
            let templateCardContainer = this.getCurrentDocument().createElement('div');
            templateCardContainer.style.display = "inline-block";
            templateCardContainer.style.margin = "5px";
            cardList.forEach((collectionCard) => {
                let instanceCardContainer = templateCardContainer.cloneNode(true);
                let graphicCard = new CollectionCardGraphicComponent(this._container, collectionCard);
                instanceCardContainer.appendChild(graphicCard);
                subContainer.appendChild(instanceCardContainer);
            });
            this._instanceContainerOpening.appendChild(subContainer);
            booster.decrementNumberBoosterOwnedForWorld(world);
            chat.addChatMessage("Opening booster", ChatMessage.BOOSTER());
            cardList.forEach((collectionCard) => {
                if (collectionCard instanceof Item) {
                    let item = collectionCard;
                    chest.addCard(item);
                    chat.addChatMessage(F.sprintf("Obtain new Item <font style='color:%s;'>%s</font>", itemRarity.getColor(item.getRarity()), item.getTitle()), ChatMessage.BOOSTER());
                }
                if (collectionCard instanceof Hero) {
                    let hero = deck.getCardWithName(collectionCard.getTitle());
                    if (hero) {
                        hero.incrementXP();
                        chat.addChatMessage("Obtain XP  for Hero " + hero.getTitle(), ChatMessage.BOOSTER());
                    }
                    else {
                        deck.addCard(hero);
                        chat.addChatMessage("Obtain new Hero " + hero.getTitle(), ChatMessage.BOOSTER());
                    }
                }
            });
            let collectionPanelGraphicComponent = this._container.get(CollectionPanelGraphicComponent.name);
            collectionPanelGraphicComponent.refreshCardLists();
        }
        else {
            chat.addChatMessage("No booster " + world.getName() + " owned.", ChatMessage.BOOSTER());
        }
    }
    updateNumberBoosterOwned() {
        const booster = this._container.get(Booster.name);
        this._listDisplayNumberBoosterOwned.forEach((element, world) => {
            element.innerHTML = "x " + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
        });
    }
}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;
//# sourceMappingURL=OpeningPanelGraphicComponent.js.map