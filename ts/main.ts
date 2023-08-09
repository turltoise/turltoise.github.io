import BodyGraphicComponent from "./Component/BodyGraphicComponent.js";
import SpriteManager from "./Component/Card/SpriteManager.js";
import ChatGraphicComponent from "./Component/ChatGraphicComponent.js";
import GoldIndicatorGraphicComponent from "./Component/GoldIndicatorGraphicComponent.js";
import HeaderGraphicComponent from "./Component/HeaderGraphicComponent.js";
import MainMenuGraphicComponent from "./Component/MainMenuGraphicComponent.js";
import MainPageGraphicComponent from "./Component/MainPageGraphicComponent.js";
import CollectionPanelGraphicComponent from "./Component/Panel/CollectionPanelGraphicComponent.js";
import AdventureSceneGraphicComponent from "./Component/Panel/Combat/AdventureSceneGraphicComponent.js";
import CombatMenuGraphicComponent from "./Component/Panel/Combat/CombatMenuGraphicComponent.js";
import CombatPanelGraphicComponent from "./Component/Panel/CombatPanelGraphicComponent.js";
import OpeningPanelGraphicComponent from "./Component/Panel/OpeningPanelGraphicComponent.js";
import ShopPanelGraphicComponent from "./Component/Panel/ShopPanelGraphicComponent.js";
import StoreGraphicComponent from "./Component/StoreGraphicComponent.js";
import Container from "./Container.js";
import WorldList from "./Game/Adventure/WorldList.js";
import Booster from "./Game/Booster/Booster.js";
import ItemRarity from "./Game/Card/ItemRarity.js";
import Chest from "./Game/CardManager/Chest.js";
import Collection from "./Game/CardManager/Collection.js";
import Deck from "./Game/CardManager/Deck.js";
import Chat from "./Game/Chat/Chat.js";
import Combat from "./Game/Combat.js";
import World1_Hero1 from "./Game/Hero/World1_Hero1.js";
import MainScreen from "./Game/MainScreen.js";
import Resource from "./Game/Resource.js";
import AllWorldProgress from "./Game/State/AllWorldProgress.js";
import Store from "./Game/Store.js";

const  mainContainer = new Container();

mainContainer.add(new Chat());
mainContainer.add(new AllWorldProgress());
mainContainer.add(new Collection());
mainContainer.add(new Deck());
mainContainer.add(new Chest());
mainContainer.add(new ItemRarity());



/* BEGIN -------------  FOR TESTS */

const cardA = new World1_Hero1(mainContainer, 1);
const myCollection: Collection = mainContainer.get(Collection.name);
myCollection.addCard(cardA);
myCollection.addCard(new World1_Hero1(mainContainer, 2));
myCollection.addCard(new World1_Hero1(mainContainer, 3));
myCollection.addCard(new World1_Hero1(mainContainer, 4));
myCollection.addCard(new World1_Hero1(mainContainer, 5));
myCollection.addCard(new World1_Hero1(mainContainer, 100));
myCollection.addCard(new World1_Hero1(mainContainer, 100));

//const myChest: Chest = mainContainer.get(Chest.name);
//myChest.addCard(new World1_Item1(mainContainer, 1));
//myChest.addCard(new World1_Item1(mainContainer, 10));

const myDeck: Deck = mainContainer.get(Deck.name);
myDeck.addCard(cardA);

/* END -------------  FOR TESTS */





mainContainer.add(new WorldList(mainContainer));
mainContainer.add(new Booster(mainContainer));
mainContainer.add(new SpriteManager(mainContainer));

mainContainer.add(new Store());
mainContainer.add(new StoreGraphicComponent(mainContainer));
mainContainer.add(new Combat(mainContainer));

mainContainer.add(new Resource());
mainContainer.add(new GoldIndicatorGraphicComponent(mainContainer));
mainContainer.add(new AdventureSceneGraphicComponent(mainContainer));
mainContainer.add(new CombatMenuGraphicComponent(mainContainer));

mainContainer.add(new CombatPanelGraphicComponent(mainContainer));
mainContainer.add(new CollectionPanelGraphicComponent(mainContainer));
mainContainer.add(new OpeningPanelGraphicComponent(mainContainer));
mainContainer.add(new ShopPanelGraphicComponent(mainContainer));
mainContainer.add(new MainScreen(mainContainer));
mainContainer.add(new MainMenuGraphicComponent(mainContainer));
mainContainer.add(new ChatGraphicComponent(mainContainer));

mainContainer.add(new HeaderGraphicComponent(mainContainer));
mainContainer.add(new BodyGraphicComponent(mainContainer));

const  mainPage: MainPageGraphicComponent = new MainPageGraphicComponent(mainContainer);
mainContainer.add(mainPage);

let body = document.body;
body.style.margin = "0";
body.style.padding = "0";
body.style.overflowY = "scroll";

body.appendChild(mainPage);