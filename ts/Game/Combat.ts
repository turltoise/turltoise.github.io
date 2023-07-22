import CombatMenuGraphicComponent from "../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import Container from "../Container.js";
import AbstractWorld from "./Adventure/World/AbstractWorld.js";
import Chat from "./Chat/Chat.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Level from "./Level.js";
import AllWorldProgress from "./State/AllWorldProgress.js";

class Combat {
	private _container: Container;
	private _combatState: string;
	private _combatCountDownLevel: number;
	private _combatStatusText: string;
	private _currentWorld: AbstractWorld;
	private _currentLevel: Level;

	constructor(container: Container) {
		this._container = container;
		this._combatState = CombatMenuGraphicComponent.getStop();
		this._combatCountDownLevel = 0;
		this._combatStatusText = "";

		this._currentWorld = null; // TODO problem with this
		this._currentLevel = null
		
		const self = this;
		setInterval(() => self.internalLoop(), 1000);
	}

	getCombatState(): string {return this._combatState;}
	getCombatStatusText(): string {return this._combatStatusText;}
	getCombatCountDownLevel(): number {return this._combatCountDownLevel;}

	getCurrentLevel(): Level {return this._currentLevel;}

	setCombatState(combatState: string) {this._combatState = combatState;}
	setCombatStatusText(combatStatusText: string) {this._combatStatusText = combatStatusText;}
	setCombatCountDownLevel(combatCountDownLevel: number) {this._combatCountDownLevel = combatCountDownLevel;}
	

	setCurrentWorld(currentWorld: AbstractWorld) {this._currentWorld = currentWorld;}
	getCurrentWorld(): AbstractWorld {return this._currentWorld;}

	internalLoop() {
		const combatState = this._combatState;
		switch (combatState) {
		  case CombatMenuGraphicComponent.getContinue():
		    this.continue();
		    break;
		  case CombatMenuGraphicComponent.getStart():
		  	this.preStart();
		    break;
		  case CombatMenuGraphicComponent.getStarting():
		  	this.starting();
		  	break;
		  case CombatMenuGraphicComponent.getStop():
		  	this.stop();
		    break;
		  case CombatMenuGraphicComponent.getNext():
		  	this.nextLevel();
		    break;
		  case CombatMenuGraphicComponent.getPrevious():
		    this.previousLevel();
		    break;
		  default:
		    break;
		}
	}

	preStart() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		const chat: Chat = this._container.get(Chat.name);
		this._currentLevel = new Level(
			this._container,
			allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())
		);
		this._currentLevel.prestart(this._currentWorld);
		this._combatCountDownLevel = 2;
		this._combatState = CombatMenuGraphicComponent.getStarting();
		const text = "Level " + this.#getCurrentLevelName() + " starts in " + this._combatCountDownLevel + ".";
		this._combatStatusText = text;
		chat.addChatMessage(text, ChatMessage.COUNT_DOWN());
		this._combatCountDownLevel -= 1;
	}

	nextLevel() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		const chat: Chat = this._container.get(Chat.name);
		if (allWorldProgress.getMaxLevelReachForWorld(this._currentWorld.getName()) + 1 > allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())) {
			allWorldProgress.incrementCurrentLevelForWorld(this._currentWorld.getName());
			this._combatState = CombatMenuGraphicComponent.getStart();
		} else {
			chat.addChatMessage(
				"Can't increase above level " + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) + ". You need to win current level first.",
				ChatMessage.ERROR()
			);
			this._combatState = CombatMenuGraphicComponent.getStop();
		}
	}

	previousLevel() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		const chat: Chat = this._container.get(Chat.name);
		// if possible
		if (allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) > 1) { // 1 = first level
			// reduce level
			allWorldProgress.reduceCurrentLevelForWorld(this._currentWorld.getName());
			console.debug("Reduce to level " + this.#getCurrentLevelName());
			// start the new level
			this._combatState = CombatMenuGraphicComponent.getStart();
		} else {
			chat.addChatMessage("Level can't be reduce", ChatMessage.ERROR());
			this._combatState = CombatMenuGraphicComponent.getStop();
		}
	}

	starting() {
		const chat: Chat = this._container.get(Chat.name);
		const text = "Level " + this.#getCurrentLevelName() + " starts in " + this._combatCountDownLevel + ".";
		this._combatStatusText = text;
		chat.addChatMessage(text, ChatMessage.COUNT_DOWN());
		if (this._combatCountDownLevel == 0) {
			this._currentLevel.start();
			// then continue
			this.continue();
		} else {
			this._combatCountDownLevel -= 1;
		}
	}

	stop() {
		if (this._currentLevel) {
			this._currentLevel.stop();
			this._combatState = null;
		}
	}

	continue() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		const chat: Chat = this._container.get(Chat.name);
		// force continue state
		this._combatState = CombatMenuGraphicComponent.getContinue();
		let currentEnemy = this._currentLevel.getCurrentEnemy();
		let currentHero = this._currentLevel.getCurrentHero();

		if (currentEnemy == null) {
			chat.addChatMessage("You win !  Level " + this.#getCurrentLevelName() + " completed !", ChatMessage.SUCCES());
			this._combatState = CombatMenuGraphicComponent.getStop();
			allWorldProgress.setMaxLevelReachForWorld(
				this._currentWorld.getName(),
				allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())
			);
			this._currentLevel = null;
			return;
		}
		if (currentHero == null) {
			chat.addChatMessage("You loose !  Level " + this.#getCurrentLevelName() + ".", ChatMessage.FAILURE());
			this._combatState = null;
			this._currentLevel = null;
			return;
		}
		this._currentLevel.fight();	
	}

	#getCurrentLevelName() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		return this._currentWorld.getName() + "_" + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName());
	}
}

export default Combat;