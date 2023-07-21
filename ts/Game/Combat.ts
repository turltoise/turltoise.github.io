import CombatMenuGraphicComponent from "../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Level from "./Level.js";
import State from "./State/State.js";
class Combat {
	private _state: State;

	constructor(state: State) {
		this._state = state;
		const self = this;
		setInterval(() => self.internalLoop(), 1000);
	}

	internalLoop() {
		const combatState = this._state.getCombatState();
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
		this._state.setLevel(new Level(
			this._state,
			this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName())
		));
		this._state.getLevel().prestart();
		this._state.setCombatCountDownLevel(2);
		this._state.setCombatState(CombatMenuGraphicComponent.getStarting());
		const text = "Level " + this.#getCurrentLevelName() + " starts in "+this._state.getCombatCountDownLevel() + ".";
		this._state.setCombatStatusText(text);
		this._state.addChatMessage(text, ChatMessage.COUNT_DOWN());
		this._state.setCombatCountDownLevel(this._state.getCombatCountDownLevel() -1);
	}

	nextLevel() {
		if (this._state.getAllWorldProgress().getMaxLevelReachForWorld(this._state.getCurrentWorld().getName()) + 1 > this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName())) {
			this._state.getAllWorldProgress().incrementCurrentLevelForWorld(this._state.getCurrentWorld().getName());
			this._state.setCombatState(CombatMenuGraphicComponent.getStart());
		} else {
			this._state.addChatMessage(
				"Can't increase above level " + this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName()) + ". You need to win current level first.",
				ChatMessage.ERROR()
			);
			this._state.setCombatState(CombatMenuGraphicComponent.getStop());
		}
	}

	previousLevel() {
		// if possible
		if (this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName()) > 1) { // 1 = first level
			// reduce level
			this._state.getAllWorldProgress().reduceCurrentLevelForWorld(this._state.getCurrentWorld().getName());
			console.debug("Reduce to level " + this.#getCurrentLevelName());
			// start the new level
			this._state.setCombatState(CombatMenuGraphicComponent.getStart());
		} else {
			this._state.addChatMessage("Level can't be reduce", ChatMessage.ERROR());
			this._state.setCombatState(CombatMenuGraphicComponent.getStop());
		}
	}

	starting() {
		const text = "Level " + this.#getCurrentLevelName() + " starts in "+this._state.getCombatCountDownLevel()+".";
		this._state.setCombatStatusText(text);
		this._state.addChatMessage(text, ChatMessage.COUNT_DOWN());
		if (this._state.getCombatCountDownLevel() == 0) {
			this._state.getLevel().start();
			// then continue
			this.continue();
		} else {
			this._state.setCombatCountDownLevel(this._state.getCombatCountDownLevel() -1);
		}
	}

	stop() {
		if (this._state.getLevel()) {
			this._state.getLevel().stop();
			this._state.setCombatState(null);
		}
	}

	continue() {
		// force continue state
		this._state.setCombatState(CombatMenuGraphicComponent.getContinue());
		let currentEnemy = this._state.getLevel().getCurrentEnemy();
		let currentHero = this._state.getLevel().getCurrentHero();

		if (currentEnemy == null) {
			this._state.addChatMessage("You win !  Level " + this.#getCurrentLevelName() + " completed !", ChatMessage.SUCCES());
			this._state.setCombatState(CombatMenuGraphicComponent.getStop());
			this._state.getAllWorldProgress().setMaxLevelReachForWorld(
				this._state.getCurrentWorld().getName(),
				this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName())
			);
			this._state.setLevel(null);
			return;
		}
		if (currentHero == null) {
			this._state.addChatMessage("You loose !  Level " + this.#getCurrentLevelName() + ".", ChatMessage.FAILURE());
			this._state.setCombatState(null);
			this._state.setLevel(null);
			return;
		}
		this._state.getLevel().fight();	
	}

	#getCurrentLevelName() {
		return this._state.getCurrentWorld().getName() + "_" + this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName());
	}
}

export default Combat;