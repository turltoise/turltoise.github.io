import AdventureSceneGraphicComponent from "../Component/Panel/Combat/AdventureSceneGraphicComponent.js";
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
	private _automaticMode: string;

	constructor(container: Container) {
		this._container = container;
		this._combatState = Combat.STATE_STOP();
		this._combatCountDownLevel = 0;
		this._combatStatusText = "";

		this._currentWorld = null;
		this._currentLevel = null
		this._automaticMode = Combat.AUTOMATIC_MODE_LOOP();
		const self = this;
		setInterval(() => self.internalLoop(), 1000);
	}

	getCombatState(): string {return this._combatState;}
	getCombatStatusText(): string {return this._combatStatusText;}
	getCombatCountDownLevel(): number {return this._combatCountDownLevel;}

	getCurrentLevel(): Level {return this._currentLevel;}

	setCombatState(combatState: string): void {this._combatState = combatState;}
	setCombatStatusText(combatStatusText: string): void {this._combatStatusText = combatStatusText;}
	setCombatCountDownLevel(combatCountDownLevel: number): void {this._combatCountDownLevel = combatCountDownLevel;}
	
	getAutomaticMode(): string {return this._automaticMode;}
	setAutomaticMode(mode: string): void {this._automaticMode=mode;}

	setCurrentWorld(currentWorld: AbstractWorld): void {this._currentWorld = currentWorld;}
	getCurrentWorld(): AbstractWorld {return this._currentWorld;}

	getWorldInProgress(): string {
		if (this._currentLevel) {
			return this._currentWorld.getName();
		}
		return null;;
	}

	internalLoop() {
		const combatState = this._combatState;
		switch (combatState) {
		  case Combat.STATE_CONTINUE():
		    this.continue();
		    break;
		  case Combat.STATE_START():
		  	this.preStart();
		    break;
		  case Combat.STATE_STARTING():
		  	this.starting();
		  	break;
		  case Combat.STATE_STOP():
		  	this.stop();
		    break;
		  case Combat.STATE_NEXT():
		  	this.nextLevel();
		    break;
		  case Combat.STATE_PREVIOUS():
		    this.previousLevel();
		    break;
		  case Combat.STATE_FORFEIT():
		    this.forfeitLevel();
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
		this._combatState = Combat.STATE_STARTING();
		const text = "Level " + this.#getCurrentLevelName() + " starts in " + this._combatCountDownLevel + ".";
		this._combatStatusText = text;
		chat.addChatMessage(text, ChatMessage.COUNT_DOWN());
		this._combatCountDownLevel -= 1;
		
		const adventureSceneGraphicComponent:AdventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
		adventureSceneGraphicComponent.cleanHeroCards();
		adventureSceneGraphicComponent.cleanEnemyCards();
		adventureSceneGraphicComponent.displayHeroCards(this._currentLevel.getHeroListForFight());
		adventureSceneGraphicComponent.displayEnemyCards(this._currentLevel.getEnemyList());
	}

	forfeitLevel() {
		this.setCombatStatusText("Combat forfeit!");
		let chat: Chat = this._container.get(Chat.name);
		this._currentLevel = null;
		this._combatState = null;
		chat.addChatMessage("Level forfeited, you can now choose another world.", null);
		const adventureSceneGraphicComponent:AdventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
		adventureSceneGraphicComponent.cleanHeroCards();
		adventureSceneGraphicComponent.cleanEnemyCards();
	}

	nextLevel() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		const chat: Chat = this._container.get(Chat.name);
		if (this.#isNextLevelAvailable()) {
			allWorldProgress.incrementCurrentLevelForWorld(this._currentWorld.getName());
			this._combatState = Combat.STATE_START();
		} else {
			chat.addChatMessage(
				"Can't increase above level " + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) + ". You need to win current level first.",
				ChatMessage.ERROR()
			);
			this._combatState = Combat.STATE_STOP();
		}
	}

	#isNextLevelAvailable() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		if (allWorldProgress.getMaxLevelReachForWorld(this._currentWorld.getName()) + 1 > allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())) {
			return true;
		} else {
			return false;
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
			this._combatState = Combat.STATE_START();
		} else {
			chat.addChatMessage("Level can't be reduce", ChatMessage.ERROR());
			this._combatState = Combat.STATE_STOP();
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
		this._combatState = Combat.STATE_CONTINUE();
		let currentEnemy = this._currentLevel.getCurrentEnemy();
		let currentHero = this._currentLevel.getCurrentHero();

		if (currentEnemy == null) {
			chat.addChatMessage("You win !  Level " + this.#getCurrentLevelName() + " completed !", ChatMessage.SUCCES());
			this._combatState = null;
			allWorldProgress.setMaxLevelReachForWorld(
				this._currentWorld.getName(),
				allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())
			);
			this._currentLevel = null;
			this.setCombatStatusText("You won!");
			const adventureSceneGraphicComponent:AdventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
			adventureSceneGraphicComponent.cleanHeroCards();
			adventureSceneGraphicComponent.cleanEnemyCards();
			this.#automaticLaunch();
			return;
		}
		if (currentHero == null) {
			chat.addChatMessage("You loose !  Level " + this.#getCurrentLevelName() + ".", ChatMessage.FAILURE());
			this._combatState = null;
			this._currentLevel = null;
			this.setCombatStatusText("You lost!");
			const adventureSceneGraphicComponent:AdventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
			adventureSceneGraphicComponent.cleanHeroCards();
			adventureSceneGraphicComponent.cleanEnemyCards();
			this.#automaticLaunch();
			return;
		}
		this._currentLevel.fight();	
	}

	#getCurrentLevelName() {
		const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
		return this._currentWorld.getName() + "_" + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName());
	}

	#automaticLaunch() {
		if (this._automaticMode == Combat.AUTOMATIC_MODE_INCREMENT() && this.#isNextLevelAvailable()) {
			this.nextLevel();
		} else {
			this._combatState = Combat.STATE_START();
		}
	}

	static STATE_START() { return "START"; }
    // after start
    static STATE_STARTING() { return "STARTING"; }
    static STATE_STOP() { return "STOP"; }
    static STATE_PREVIOUS() { return "PREVIOUS"; }
    static STATE_NEXT() { return "NEXT"; }
    static STATE_CONTINUE() { return "CONTINUE"; }
	static STATE_FORFEIT() { return "FORFEIT"; }

	static AUTOMATIC_MODE_LOOP() {return "LOOP";}
	static AUTOMATIC_MODE_INCREMENT() {return "INCREMENT";}
}

export default Combat;