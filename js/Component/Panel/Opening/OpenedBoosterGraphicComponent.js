import Booster from "../../../Game/Booster/Booster.js";
import Hero from "../../../Game/Card/Hero.js";
import Item from "../../../Game/Card/Item.js";
import ItemRarity from "../../../Game/Card/ItemRarity.js";
import RewardComputer from "../../../Game/Card/RewardComputer.js";
import Chest from "../../../Game/CardManager/Chest.js";
import Deck from "../../../Game/CardManager/Deck.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import F from "../../../Game/Tools/F.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import AbstractPanelGraphicComponent from "../AbstractPanelGraphicComponent.js";
import CollectionPanelGraphicComponent from "../CollectionPanelGraphicComponent.js";
class OpenedBoosterGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container, world) {
        super(container);
        let booster = this._container.get(Booster.name);
        let chest = this._container.get(Chest.name);
        let deck = this._container.get(Deck.name);
        let chat = this._container.get(Chat.name);
        let itemRarity = this._container.get(ItemRarity.name);
        let subContainer = this.getCurrentDocument().createElement('div');
        subContainer.style.display = "inline-block";
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
        this._instanceContainer.appendChild(subContainer);
        booster.decrementNumberBoosterOwnedForWorld(world);
        chat.addChatMessage(F.sprintf("Opening booster <font style='font-weight:bold;'>%s</font>", world.getName()), ChatMessage.BOOSTER());
        cardList.forEach((collectionCard) => {
            if (collectionCard instanceof Item) {
                let item = collectionCard;
                chest.addCard(item);
                chat.addChatMessage(F.sprintf("Obtain new Item <font style='color:%s;font-weight:bold;'>%s</font>", itemRarity.getColor(item.getRarity()), item.getTitle()), ChatMessage.BOOSTER());
            }
            if (collectionCard instanceof Hero) {
                let hero = deck.getCardWithName(collectionCard.getTitle());
                if (hero) {
                    hero.incrementXP();
                    chat.addChatMessage(F.sprintf("Obtain XP  for Hero <font style='font-weight:bold;'>%s</font>", hero.getTitle()), ChatMessage.BOOSTER());
                }
                else {
                    deck.addCard(hero);
                    chat.addChatMessage(F.sprintf("Obtain new Hero <font style='font-weight:bold;'>%s</font>", hero.getTitle()), ChatMessage.BOOSTER());
                }
            }
        });
        let collectionPanelGraphicComponent = this._container.get(CollectionPanelGraphicComponent.name);
        collectionPanelGraphicComponent.refreshCardLists();
    }
}
customElements.define('opened-booster', OpenedBoosterGraphicComponent);
export default OpenedBoosterGraphicComponent;
//# sourceMappingURL=OpenedBoosterGraphicComponent.js.map