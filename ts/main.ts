import BodyGraphicComponent from "./Component/BodyGraphicComponent.js";
import ChatGraphicComponent from "./Component/ChatGraphicComponent.js";
import GoldIndicatorGraphicComponent from "./Component/GoldIndicatorGraphicComponent.js";
import HeaderGraphicComponent from "./Component/HeaderGraphicComponent.js";
import MainMenuGraphicComponent from "./Component/MainMenuGraphicComponent.js";
import CollectionPanelGraphicComponent from "./Component/Panel/CollectionPanelGraphicComponent.js";
import AdventureSceneGraphicComponent from "./Component/Panel/Combat/AdventureSceneGraphicComponent.js";
import CombatMenuGraphicComponent from "./Component/Panel/Combat/CombatMenuGraphicComponent.js";
import CombatPanelGraphicComponent from "./Component/Panel/CombatPanelGraphicComponent.js";
import OpeningPanelGraphicComponent from "./Component/Panel/OpeningPanelGraphicComponent.js";
import ShopPanelGraphicComponent from "./Component/Panel/ShopPanelGraphicComponent.js";
import StoreGraphicComponent from "./Component/StoreGraphicComponent.js";

import WorldList from "./Game/Adventure/WorldList.js";
import Hero from "./Game/Card/Hero.js";
import RawCarac from "./Game/Card/RawCarac.js";
import Collection from "./Game/CardManager/Collection.js";
import Deck from "./Game/CardManager/Deck.js";
import Combat from "./Game/Combat.js";
import MainScreen from "./Game/MainScreen.js";
import Resource from "./Game/Resource.js";
import State from "./Game/State/State.js";
import Store from "./Game/Store.js";

const body = document.body;
body.style.margin = "0";
body.style.padding = "0";
body.style.overflowY = "scroll";


const containerImg = document.createElement('div');
containerImg.style.width = "100%"; 
containerImg.style.height = "100%"; 
containerImg.style.minWidth = "100%"; 
containerImg.style.minHeight = "100%"; 
containerImg.style.position = "fixed"; 
containerImg.style.left = "0px"; 
containerImg.style.top = "0px"; 
containerImg.style.zIndex = "-10";

containerImg.style.display = "flex";
containerImg.style.justifyContent = "center";
containerImg.style.alignItems = "center";
containerImg.style.overflow = "hidden";

const imgBg = document.createElement('img');
imgBg.style.position = "relative";
imgBg.src = "./img/bg.jpg";
imgBg.style.minWidth="100%";
imgBg.style.minHeight="100%";

imgBg.style.flexShrink = "0";


const templateContainerBody = document.createElement('div');
const instanceContainerBody = <HTMLElement> templateContainerBody.cloneNode(true);

instanceContainerBody.style.boxSizing = "border-box";


// State & Store
const myCollection = new Collection();

const myCarac = new RawCarac(
	1,//strength=null,
	1,//dexterity=null,
	1,//intelligence=null,
	1,//luck=null,

	1,//physicalDamage=null,
	1,//physicalCriticalRate=null,
	1,//physicalCriticalNumber=null,

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

const cardA = new Hero(myCarac,1,"A","illidan.webp");

myCollection.addCard(cardA);
myCollection.addCard(new Hero(myCarac,1,"B","illidan.webp"));
myCollection.addCard(new Hero(myCarac,2,"C","illidan.webp"));
myCollection.addCard(new Hero(myCarac,3,"D","illidan.webp"));
myCollection.addCard(new Hero(myCarac,4,"E","illidan.webp"));
myCollection.addCard(new Hero(myCarac,5,"F","illidan.webp"));
myCollection.addCard(new Hero(myCarac,6,"G","illidan.webp"));
myCollection.addCard(new Hero(myCarac,7,"H","illidan.webp"));
myCollection.addCard(new Hero(myCarac,8,"I","illidan.webp"));
myCollection.addCard(new Hero(myCarac,9,"J","illidan.webp"));
myCollection.addCard(new Hero(myCarac,10,"K","illidan.webp"));
myCollection.addCard(new Hero(myCarac,11,"L","illidan.webp"));
myCollection.addCard(new Hero(myCarac,12,"M","illidan.webp"));
myCollection.addCard(new Hero(myCarac,13,"N","illidan.webp"));
myCollection.addCard(new Hero(myCarac,14,"O","illidan.webp"));
myCollection.addCard(new Hero(myCarac,15,"P","illidan.webp"));
myCollection.addCard(new Hero(myCarac,16,"Q","illidan.webp"));
myCollection.addCard(new Hero(myCarac,17,"R","illidan.webp"));

myCollection.getCardFromUUID("This is a warning to test");

const myDeck = new Deck();
myDeck.addCard(cardA);

const myResource = new Resource();
const myWorldList = new WorldList();
const myState = new State(document, myCollection, myDeck, myResource, myWorldList);
// hack TT
myWorldList.generateWorldList(myState);

const myStore = new Store(myState);
const myGStore = new StoreGraphicComponent(myState, myStore);


const myCombat = new Combat(myState);

const myGoldIndicator = new GoldIndicatorGraphicComponent(myState);


// panels & main menu

// Combat / Adventure
const myAdventure = new AdventureSceneGraphicComponent(myState);
const myMenuCombat = new CombatMenuGraphicComponent(myState, myAdventure); 
const myCombatPanel = new CombatPanelGraphicComponent(myState, myAdventure, myMenuCombat);

// Collection
const myCollectionPanel = new CollectionPanelGraphicComponent(myState)

// Opening
const myOpeningPanel = new OpeningPanelGraphicComponent(myState)

// Shop
const myShopPanel = new ShopPanelGraphicComponent(myState);

const myMainScreen = new MainScreen(
	myCombatPanel, myCollectionPanel, myOpeningPanel, myShopPanel
);

const myMainMenu = new MainMenuGraphicComponent(myState, myMainScreen);

const myChatComponent = new ChatGraphicComponent(myState);


const myHeader = new HeaderGraphicComponent(myState, myGoldIndicator, myMainMenu);
const myBody = new BodyGraphicComponent(
	myState, 
	myCombatPanel,
	myCollectionPanel,
	myOpeningPanel,
	myShopPanel,
	myChatComponent
);

containerImg.appendChild(imgBg);
instanceContainerBody.appendChild(containerImg);

instanceContainerBody.appendChild(myHeader);
instanceContainerBody.appendChild(myBody);

instanceContainerBody.appendChild(myGStore);

body.appendChild(instanceContainerBody);