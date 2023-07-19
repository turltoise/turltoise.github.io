// To set the level at the beginning of the fight
import State from "./State/State.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Enemy from "./Card/Enemy.js";
import AggregateCardComputedForFight from "./Card/AggregateCardComputedForFight.js";

class Level {
	private _state: State;
	private _levelNumber: number;
	private _enemyList: Map<String, AggregateCardComputedForFight>;
	private _heroListForFight: Map<String, AggregateCardComputedForFight>;
	private _currentPositionOfEnemyInList: number;
	private _currentPositionOfHeroInList: number;

	constructor(state: State, levelNumber: number) {
		this._state  = state;
		this._levelNumber = levelNumber;
	
		this._enemyList   = new Map();
		this._heroListForFight = new Map();
		this._currentPositionOfEnemyInList = Level.ZERO();
		this._currentPositionOfHeroInList  = Level.ZERO();
	}

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

	getCurrentEnemy(): AggregateCardComputedForFight {
		const currentEnemy = this._enemyList.get(this._currentPositionOfEnemyInList.toString());
		if (currentEnemy) { 
			return (currentEnemy.isAlive()) ? currentEnemy : this.#getNextEnemy();
		} else {
			return null;
		}
	}

	getCurrentHero(): AggregateCardComputedForFight {
		const currentPositionOfHeroInList = this._heroListForFight.get(this._currentPositionOfHeroInList.toString());
		return (currentPositionOfHeroInList.isAlive()) ? currentPositionOfHeroInList : this.#getNextAliveHero();
	}

	setNextHero(): AggregateCardComputedForFight {
		return this.#getNextAliveHero();
	}

	#generateEnemyList(): void {
		let idListCard = Level.ZERO();
		const currentLevel = this._state.getCurrentWorld().getWorlLeveldByNumber(this._levelNumber);
		currentLevel.getMonsterList().forEach((enemy :Enemy, uuid) => {
            this._enemyList.set(idListCard.toString(), enemy.getObjecForFight());
            idListCard++;
        });
	}

	// Map of cards with id from 0 to n
	#generateHeroListForFight(): void {
		let idListCard = Level.ZERO();
		this._state.getCardDeckList().forEach((hero, uuid) => {
            this._heroListForFight.set(idListCard.toString(), hero.getObjecForFight());
            idListCard++;
        });
	}

	#getNextEnemy(): AggregateCardComputedForFight {
		this.#setNextEnemy();
		return (this.#isLastEnemyAlreadyDefeated()) ? null : this._enemyList.get(this._currentPositionOfEnemyInList.toString());
	}

	#setNextEnemy(): void {
		this._currentPositionOfEnemyInList = this._currentPositionOfEnemyInList + 1;
	}

	#isLastEnemyAlreadyDefeated(): boolean {
		return (this._enemyList.size > this._currentPositionOfEnemyInList) ? false : true;
	}

	#getNextAliveHero(): AggregateCardComputedForFight {
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
}
export default Level;