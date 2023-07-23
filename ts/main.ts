import BodyGraphicComponent from "./Component/BodyGraphicComponent.js";
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
import Hero from "./Game/Card/Hero.js";
import RawCarac from "./Game/Card/RawCarac.js";
import Collection from "./Game/CardManager/Collection.js";
import Deck from "./Game/CardManager/Deck.js";
import Chat from "./Game/Chat/Chat.js";
import Combat from "./Game/Combat.js";
import PhysicalAttack from "./Game/Fight/Capacity/List/PhysicalAttack.js";
import MainScreen from "./Game/MainScreen.js";
import Resource from "./Game/Resource.js";
import AllWorldProgress from "./Game/State/AllWorldProgress.js";
import Store from "./Game/Store.js";
import UUID from "./Game/Tools/UUID.js";

const  mainContainer = new Container();

mainContainer.add(new Chat());
mainContainer.add(new AllWorldProgress());
mainContainer.add(new Collection());
mainContainer.add(new Deck());



/* BEGIN -------------  FOR TESTS */

const myCarac = new RawCarac(
	3,//strength=null,
	3,//dexterity=null,
	3,//intelligence=null,
	3,//luck=null,

	10,//physicalDamage=null,
	5,//physicalCriticalRate=null,
	5,//physicalCriticalNumber=null,

	1,//magicDamage=null,
	1,//magicCriticalRate=null,
	1,//magicCriticalNumber=null,

	1,//fireResistance=null,
	1,//waterResistance=null,
	1,//plantResistance=null,
	1,//necromancyResistance=null,
	1,//blessingResistance=null,
	1,//armor=null,

	1,//accuracy=null,
	1,//escape=null,

	30,//life=null
);

const capacities1 = new Map([[UUID.generateUUID(), new PhysicalAttack(mainContainer)]]);
const cardA = new Hero(myCarac,1,"My card A","illidan.webp", capacities1);
const myCollection: Collection = mainContainer.get(Collection.name);
myCollection.addCard(cardA);
myCollection.addCard(new Hero(myCarac,1,"My card B","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,2,"My card C","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,3,"My card D","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,4,"My card E","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,5,"My card F","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,6,"My card G","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,7,"My card H","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,8,"My card I","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,9,"My card J","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,10,"My card K","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,11,"My card L","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,12,"My card M","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,13,"My card N","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,14,"My card O","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,15,"My card P","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,16,"My card Q","illidan.webp", capacities1));
myCollection.addCard(new Hero(myCarac,17,"My card R","illidan.webp", capacities1));

const myDeck: Deck = mainContainer.get(Deck.name);
myDeck.addCard(cardA);

/* END -------------  FOR TESTS */





mainContainer.add(new WorldList(mainContainer));

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