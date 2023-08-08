import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Booster from "../../Game/Booster/Booster.js";
import CollectionCard from "../../Game/Card/CollectionCard.js";
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
    private _listDisplayNumberBoosterOwned: Map<AbstractWorld, HTMLElement>;
    private _instanceContainerOpening: HTMLElement;
    
    constructor(container: Container) {
        super(container);
        this._listDisplayNumberBoosterOwned = new Map();
        let worldList = container.get(WorldList.name);

        this._instanceContainer.style.backgroundColor = "#A5ABDB";
        this._instanceContainer.style.paddingBottom = "20px";
        this._instanceContainer.style.paddingTop = "20px";
        this._instanceContainer.style.backgroundSize = "100%";

        let templateContainerBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateContainerBooster.style.display = "inline-block";
        templateContainerBooster.style.margin = "5px";

        let instanceContainerListBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceContainerListBooster.style.textAlign = "center";
        instanceContainerListBooster.style.backgroundColor = "#828acd";
        instanceContainerListBooster.style.margin = "70px 175px";
        instanceContainerListBooster.style.padding = "20px";
        instanceContainerListBooster.style.height = "160px";

        let templateBtnOpen = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBtnOpen.style.display = "block";
        templateBtnOpen.style.background = "linear-gradient(to left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.5) 100%)";
		templateBtnOpen.style.backgroundColor = "#eb5554";
        templateBtnOpen.style.color = "white";
        templateBtnOpen.style.padding = "5px"
        templateBtnOpen.style.cursor = "pointer";
        templateBtnOpen.style.userSelect = "none";
        templateBtnOpen.style.caretColor = "transparent";
        templateBtnOpen.style.marginTop = "-50px";
        templateBtnOpen.style.fontWeight = "700";

        let instanceTitle = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceTitle.innerHTML = "Open booster";
        instanceTitle.style.fontSize = "30px";
        instanceTitle.style.fontWeight = "900";
        instanceTitle.style.marginLeft = "40px";
        instanceTitle.style.marginBottom = "40px";

        this._instanceContainer.appendChild(instanceTitle);
        this._instanceContainer.appendChild(instanceContainerListBooster)
        const booster = this._container.get(Booster.name);
        worldList.getList().forEach(((world:AbstractWorld, position: number)=>{
            let boosterCard = new BoosterCard(container, world);
            let instanceContainerBooster = <HTMLElement> templateContainerBooster.cloneNode(true);
            instanceContainerBooster.onclick = () => this.selectingBooster(world);
            let instanceBtnOpen = <HTMLElement> templateBtnOpen.cloneNode(true);
            instanceBtnOpen.innerHTML = "x" + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
            this._listDisplayNumberBoosterOwned.set(world, instanceBtnOpen);
            instanceContainerBooster.appendChild(boosterCard);
            instanceContainerBooster.appendChild(instanceBtnOpen);
            instanceContainerListBooster.appendChild(instanceContainerBooster);
        }));

        this._instanceContainerOpening = <HTMLElement> this.getCurrentDocument().createElement('div');
        //this._instanceContainerOpening.style.margin = "5px";
        //this._instanceContainerOpening.style.height = "300px";
        this._instanceContainerOpening.style.textAlign = "center";
        this._instanceContainerOpening.style.backgroundColor = "#828acd";
        this._instanceContainerOpening.style.margin = "70px 175px";
        this._instanceContainerOpening.style.padding = "20px";
        this._instanceContainerOpening.style.height = "230px";
        this._instanceContainer.appendChild(this._instanceContainerOpening);
    }

    internalLoop(): void {
        this.updateNumberBoosterOwned();
    }

    selectingBooster(world: AbstractWorld)  {
        let booster: Booster = this._container.get(Booster.name);
        let number: number = booster.getNumberBoosterOwnedForWorld(world);
        let chat: Chat = this._container.get(Chat.name);
        if (number  >= 1) {
            this._instanceContainerOpening.innerHTML = "";
            let boosterCard = new BoosterCard(this._container, world);
            let subContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            subContainer.style.display = "inline-block";
            let instanceTitleOpenCurrentBooster = <HTMLElement> this.getCurrentDocument().createElement('div');
            instanceTitleOpenCurrentBooster.innerHTML = "Open booster (#TODO open 1 - 10 - 100)";
            instanceTitleOpenCurrentBooster.style.fontSize = "20px";
            instanceTitleOpenCurrentBooster.style.fontWeight = "700";
            instanceTitleOpenCurrentBooster.style.marginBottom = "20px";
            boosterCard.onclick = () => this.openingBooster(world);
            subContainer.appendChild(instanceTitleOpenCurrentBooster);
            subContainer.appendChild(boosterCard);
            this._instanceContainerOpening.appendChild(subContainer);
        } else {
            chat.addChatMessage(
                F.sprintf(
                    "No booster <font style='font-weight:bold;'>%s</font> owned.",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        }
    }

    openingBooster(world: AbstractWorld) {
        let booster: Booster = this._container.get(Booster.name);
        let chest: Chest = this._container.get(Chest.name);
        let deck: Deck = this._container.get(Deck.name);
        let chat: Chat = this._container.get(Chat.name);
        let itemRarity: ItemRarity = this._container.get(ItemRarity.name);
        let number: number = booster.getNumberBoosterOwnedForWorld(world);
        if (number  >= 1) {
            this._instanceContainerOpening.innerHTML = "";
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
            templateCardContainer.style.margin  = "5px";
            cardList.forEach((collectionCard: CollectionCard) => {
                let instanceCardContainer = <HTMLElement> templateCardContainer.cloneNode(true);
                let graphicCard: CollectionCardGraphicComponent = new CollectionCardGraphicComponent(this._container, collectionCard);
                instanceCardContainer.appendChild(graphicCard);
                subContainer.appendChild(instanceCardContainer);
            });
            this._instanceContainerOpening.appendChild(subContainer);

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
        } else {
            chat.addChatMessage(
                F.sprintf(
                    "No booster <font style='font-weight:bold;'>%s</font> owned",
                    world.getName()
                ),
                ChatMessage.BOOSTER()
            );
        }
    }

    updateNumberBoosterOwned() {
        const booster = this._container.get(Booster.name);
        this._listDisplayNumberBoosterOwned.forEach((element:HTMLElement, world:AbstractWorld) => {
            element.innerHTML = "x " + Number.displayNumber(booster.getNumberBoosterOwnedForWorld(world));
        });
    }

}
customElements.define('opening-panel', OpeningPanelGraphicComponent);
export default OpeningPanelGraphicComponent;