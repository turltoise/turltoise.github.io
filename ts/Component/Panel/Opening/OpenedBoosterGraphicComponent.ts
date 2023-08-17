import Container from "../../../Container.js";
import AbstractWorld from "../../../Game/Adventure/World/AbstractWorld.js";
import Booster from "../../../Game/Booster/Booster.js";
import CollectionCard from "../../../Game/Card/CollectionCard.js";
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
    constructor(container: Container, world: AbstractWorld) {
        super(container);

        let booster: Booster = this._container.get(Booster.name);
        let chest: Chest = this._container.get(Chest.name);
        let deck: Deck = this._container.get(Deck.name);
        let chat: Chat = this._container.get(Chat.name);
        let itemRarity: ItemRarity = this._container.get(ItemRarity.name);
            let subContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            subContainer.style.display = "inline-block";
            let instanceTitleOpenCurrentBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
            instanceTitleOpenCurrentBooster.innerHTML = "Cards obtained";
            instanceTitleOpenCurrentBooster.style.fontSize = "20px";
            instanceTitleOpenCurrentBooster.style.fontWeight = "700";
            instanceTitleOpenCurrentBooster.style.marginBottom = "20px";
            subContainer.appendChild(instanceTitleOpenCurrentBooster);

            let cardList: Map<string, CollectionCard> = RewardComputer.generate(this._container, world);
            let templateCardContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            templateCardContainer.style.display = "inline-block";
            templateCardContainer.style.verticalAlign = "top";
            templateCardContainer.style.margin  = "5px";
            cardList.forEach((collectionCard: CollectionCard) => {
                let instanceCardContainer = <HTMLElement> templateCardContainer.cloneNode(true);
                let graphicCard: CollectionCardGraphicComponent = new CollectionCardGraphicComponent(this._container, collectionCard);
                instanceCardContainer.appendChild(graphicCard);
                subContainer.appendChild(instanceCardContainer);
            });
            this._instanceContainer.appendChild(subContainer);

            booster.decrementNumberBoosterOwnedForWorld(world);

            
            chat.addChatMessage(
                F.sprintf(
                    "Opening booster <font style='font-weight:bold;'>%s</font>",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
            cardList.forEach((collectionCard: CollectionCard) => {
                if (collectionCard instanceof Item) {
                    let item: Item = <Item> collectionCard; 
                    chest.addCard(item);
                    chat.addChatMessage(
                        F.sprintf(
                            "Obtain new Item <font style='color:%s;font-weight:bold;'>%s</font>",
                            itemRarity.getColor(item.getRarity()),
                            item.getTitle()
                        ),
                        ChatMessage.BOOSTER()
                    );
                }
                if (collectionCard instanceof Hero) {
                    let hero: Hero = <Hero> deck.getCardWithName(collectionCard.getTitle());
                    if (hero) {
                        hero.incrementXP();
                        chat.addChatMessage(
                            F.sprintf(
                                "Obtain XP  for Hero <font style='font-weight:bold;'>%s</font>",
                                hero.getTitle()
                            ),
                            ChatMessage.BOOSTER()
                        );
                    } else {
                        deck.addCard(hero);
                        chat.addChatMessage(
                            F.sprintf(
                                "Obtain new Hero <font style='font-weight:bold;'>%s</font>",
                                hero.getTitle()
                            ),
                            ChatMessage.BOOSTER()
                        );
                    }
                }
            });
            let collectionPanelGraphicComponent: CollectionPanelGraphicComponent  = this._container.get(CollectionPanelGraphicComponent.name);
            collectionPanelGraphicComponent.refreshCardLists();
    }
}
customElements.define('opened-booster', OpenedBoosterGraphicComponent);
export default OpenedBoosterGraphicComponent;