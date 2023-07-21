import CombatMenuGraphicComponent from "../../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import AbstractClass from "../AbstractClass.js";
import Collection from "../CardManager/Collection.js";
import Deck from "../CardManager/Deck.js";
import Chat from "../Chat/Chat.js";
import Level from "../Level.js";
import Resource from "../Resource.js";
import AllWorldProgress from "./AllWorldProgress.js";
import AbstractWorld from "../Adventure/World/AbstractWorld.js";
import WorldList from "../Adventure/WorldList.js";

class State extends AbstractClass {
	private _collection: Collection;
	private _deck: Deck;
	private _resource: Resource;
	private _worldList: WorldList;

	private _allWorldProgress: AllWorldProgress;
	private _currentWorld: AbstractWorld;
	private _document: Document;

	private _combatState: string;
	private _combatCountDownLevel: number;
	private _combatStatusText: string;
	private _level: Level;
	private _chat: Chat;
	private _debug: boolean;

	//private _currentScript: HTMLOrSVGScriptElement;

	constructor(documentArg: Document, collection: Collection, deck: Deck, resource: Resource, worldList: WorldList) {
		super();
		this._collection = collection;
		this._deck = deck;
		this._resource = resource;
		this._worldList = worldList;

		// WorldProgress
		this._allWorldProgress = new AllWorldProgress();
		this._currentWorld = null;

		this._document = documentArg;

		// combat
		this._combatState = CombatMenuGraphicComponent.getStop();
		this._combatCountDownLevel = 0;
		this._combatStatusText = "";

		this._level = null;
		
		this._chat = new Chat();
		
		this._debug = true;
	}

	getCombatState(): string {return this._combatState;}
	setCombatState(combatState: string) { this._combatState = combatState;}
	getCombatCountDownLevel(): number {return this._combatCountDownLevel;}
	setCombatCountDownLevel(combatCountDownLevel: number) {this._combatCountDownLevel = combatCountDownLevel;}
	getCombatStatusText(): string {return this._combatStatusText;}
	setCombatStatusText(combatStatusText: string) {return this._combatStatusText = combatStatusText;}
	
	getLevel() : Level{return this._level;}
	setLevel(level: Level) {this._level = level;}
	
	getAllWorldProgress(): AllWorldProgress {return this._allWorldProgress;}
	getChat() : Chat{return this._chat;}
	getResource(): Resource {return this._resource;}
	getCollection(): Collection {return this._collection;}
	getDeck(): Deck {return this._deck;}
	getWorldList(): WorldList {return this._worldList;}
	getCurrentWorld(): AbstractWorld {return this._currentWorld;}
	setCurrentWorld(currentWorld: AbstractWorld) {this._currentWorld=currentWorld;}

	getCardDeckList() {return this._deck.getCardList();}

	addChatMessage(text, type=null) {
		this._chat.addChatMessage(text, type);
	}

	getCurrentEnemy()
	 {
	 	return (this._level) ? this._level.getCurrentEnemy() : null;	 	
	 }

	getDebug():  boolean {
		return this._debug;
	}
}

export default State;