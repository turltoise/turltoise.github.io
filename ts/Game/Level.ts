// To set the level at the beginning of the fight
import State from "./State/State.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Enemy from "./Card/Enemy.js";
import StackPlayCard from "./Card/StackPlayCard.js";
import Hero from "./Card/Hero.js";
import AbstractCapacity from "./Fight/Capacity/List/AbstractCapacity.js";
import CardAnimation from "./Card/CardAnimation.js";

class Level {
	private _state: State;
	private _levelNumber: number;
	private _enemyList: Map<String, StackPlayCard>;
	private _heroListForFight: Map<String, StackPlayCard>;
	private _currentPositionOfEnemyInList: number;
	private _currentPositionOfHeroInList: number;
	private _phase: string;

	constructor(state: State, levelNumber: number) {
		this._state  = state;
		this._levelNumber = levelNumber;
	
		this._enemyList   = new Map();
		this._heroListForFight = new Map();
		this._currentPositionOfEnemyInList = Level.ZERO();
		this._currentPositionOfHeroInList  = Level.ZERO();

		this._phase = Level.PHASE_HERO();
	}

	fight(): void {
		let currentHero: StackPlayCard = this.getCurrentHero();
		let currentEnemy: StackPlayCard = this.getCurrentEnemy();
		if (this._phase == Level.PHASE_HERO()) {
			this._state.setCombatStatusText("Your turn !");
			//currentHero.hit(currentEnemy, this._state);
			this.#action(currentHero, currentEnemy);
			this._phase = Level.PHASE_ENEMY();

			this._state.getLevel().setNextHero();
		} else if (this._phase == Level.PHASE_ENEMY()) {
			this._state.setCombatStatusText("Enemy turn !");
			//currentEnemy.hit(currentHero, this._state);
			this.#action(currentEnemy, currentHero);
			this._phase = Level.PHASE_HERO();
		}
	}

	#action(thrower: StackPlayCard, target: StackPlayCard) {
		thrower.triggerStatus();
		thrower.playCapacity(this._state, target);
		/*capacity.trigger(thrower, target);
		thrower.addFightAnimation(new CardAnimation(CardAnimation.ATTACK()));
		target.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), "4"));*/
	}
	/**
	hit(card, state) {
		state.addChatMessage(this._title + " hits " + card._title + " for " + this._currentStrength + ".", ChatMessage.SWORD());
		console.debug(card._currentLife + "/" + card._life);
		card._currentLife = parseInt(card._currentLife) - parseInt(this._currentStrength);
		console.debug(card._currentLife + "/" + card._life);

		this._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.ATTACK()));

		card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DAMAGE(), "-"+this._currentStrength));
		if (card._currentLife <= 0) {
			state.addChatMessage(card._title + " dies!", ChatMessage.DIES());
			card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DIE()));
			if (card._type == Card.ENEMY_TYPE()) {
				state._resource._gold = state._resource._gold + card._gold;
				state.addChatMessage(card._gold + " gold earned.", ChatMessage.GOLD());
			}
		}
	}
**/

	prestart(): void {
		this.#generateHeroListForFight();
		this.#generateEnemyList();
	}

	start(): void {
		this._state.addChatMessage("Starting level " + this._levelNumber, ChatMessage.LEVEL_START());
	}

	stop(): void {
		this._state.addChatMessage("Stopping level " + this._levelNumber, ChatMessage.LEVEL_STOP());
		this._enemyList = new Map();
		this._heroListForFight = new Map();
	}

	getCurrentEnemy(): StackPlayCard {
		const currentEnemy = this._enemyList.get(this._currentPositionOfEnemyInList.toString());
		if (currentEnemy) { 
			return (currentEnemy.isAlive()) ? currentEnemy : this.#getNextEnemy();
		} else {
			return null;
		}
	}

	getCurrentHero(): StackPlayCard {
		const currentPositionOfHeroInList = this._heroListForFight.get(this._currentPositionOfHeroInList.toString());
		return (currentPositionOfHeroInList.isAlive()) ? currentPositionOfHeroInList : this.#getNextAliveHero();
	}

	setNextHero(): StackPlayCard {
		return this.#getNextAliveHero();
	}

	#generateEnemyList(): void {
		let idListCard = Level.ZERO();
		const currentLevel = this._state.getCurrentWorld().getWorlLeveldByNumber(this._levelNumber);
		currentLevel.getMonsterList().forEach((enemy: Enemy, uuid) => {
            this._enemyList.set(idListCard.toString(), enemy.getStackPlayCard());
            idListCard++;
        });
	}

	// Map of cards with id from 0 to n
	#generateHeroListForFight(): void {
		let idListCard = Level.ZERO();
		this._state.getCardDeckList().forEach((hero: Hero, uuid) => {
            this._heroListForFight.set(idListCard.toString(), hero.getStackPlayCard());
            idListCard++;
        });
	}

	#getNextEnemy(): StackPlayCard {
		this.#setNextEnemy();
		return (this.#isLastEnemyAlreadyDefeated()) ? null : this._enemyList.get(this._currentPositionOfEnemyInList.toString());
	}

	#setNextEnemy(): void {
		this._currentPositionOfEnemyInList = this._currentPositionOfEnemyInList + 1;
	}

	#isLastEnemyAlreadyDefeated(): boolean {
		return (this._enemyList.size > this._currentPositionOfEnemyInList) ? false : true;
	}

	#getNextAliveHero(): StackPlayCard {
		(this.#isLastHero()) ? this.#resetIdHero() : this.#incrementIdHero();

		// start with right part of Map
		for (let i = this._currentPositionOfHeroInList; i < this._heroListForFight.size; i++) {
			if (this._heroListForFight.get(i.toString()).isAlive()) {
				this._currentPositionOfHeroInList = i;
				return this._heroListForFight.get(i.toString());
			}
	    }
	    // continue with the left part of Map
	    for (let i = Level.ZERO(); i < this._currentPositionOfHeroInList; i++) {
	      if (this._heroListForFight.get(i.toString()).isAlive()) { 
	      		this._currentPositionOfHeroInList = i;
				return this._heroListForFight.get(i.toString());
			}
	    }
	    return null;
	}

	#isLastHero(): boolean {
		return (this._currentPositionOfHeroInList == this._heroListForFight.size - 1) ? true : false;
	}

	#resetIdHero(): number {
		return this._currentPositionOfHeroInList = Level.ZERO();
	}

	#incrementIdHero(): number {
		return this._currentPositionOfHeroInList = this._currentPositionOfHeroInList + 1;
	}

	static ZERO(): number {
		return 0;
	}

	static PHASE_HERO(): string {
		return "hero";
	}

	static PHASE_ENEMY(): string {
		return "enemy";
	}
}
export default Level;