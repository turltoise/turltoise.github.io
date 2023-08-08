// To set the level at the beginning of the fight
import ChatMessage from "./Chat/ChatMessage.js";
import Enemy from "./Card/Enemy.js";
import StackPlayCard from "./Card/StackPlayCard.js";
import Hero from "./Card/Hero.js";
import WorldLevel from "./Adventure/World/WorldLevel/WorldLevel.js";
import Container from "../Container.js";
import Chat from "./Chat/Chat.js"
import AbstractWorld from "./Adventure/World/AbstractWorld.js";
import Deck from "./CardManager/Deck.js";
import Combat from "./Combat.js";

class Level {
	private _container: Container;
	private _levelNumber: number;
	private _enemyList: Map<string, StackPlayCard>;
	private _heroListForFight: Map<string, StackPlayCard>;
	private _currentPositionOfEnemyInList: number;
	private _currentPositionOfHeroInList: number;
	private _phase: string;

	constructor(container: Container, levelNumber: number) {
		this._container = container;
		this._levelNumber = levelNumber;
	
		this._enemyList   = new Map();
		this._heroListForFight = new Map();
		this._currentPositionOfEnemyInList = Level.ZERO();
		this._currentPositionOfHeroInList  = Level.ZERO();

		this._phase = Level.PHASE_HERO();
	}

	getHeroListForFight(): Map<string, StackPlayCard> {return this._heroListForFight;}
	getEnemyList(): Map<string, StackPlayCard> {return this._enemyList;}
	getLevelNumber(): number {return this._levelNumber;}

	fight(): void {
		const combat: Combat = this._container.get(Combat.name);
		let currentHero: StackPlayCard = this.getCurrentHero();
		let currentEnemy: StackPlayCard = this.getCurrentEnemy();
		if (this._phase == Level.PHASE_HERO()) {
			combat.setCombatStatusText("Your turn !");
	
			this.#action(currentHero, currentEnemy);
			this._phase = Level.PHASE_ENEMY();
			this.setNextHero();
		} else if (this._phase == Level.PHASE_ENEMY()) {
			combat.setCombatStatusText("Enemy turn !");

			this.#action(currentEnemy, currentHero);
			this._phase = Level.PHASE_HERO();
		}
	}

	#action(thrower: StackPlayCard, target: StackPlayCard) {
		thrower.triggerStatus();
		thrower.playCapacity(this._container, target);
	}

	prestart(currentWorld:AbstractWorld): void {
		this.#generateHeroListForFight();
		this.#generateEnemyList(currentWorld);
	}

	start(): void {
		const chat: Chat = this._container.get(Chat.name);
		chat.addChatMessage(
			"Starting level " + this._levelNumber,
			ChatMessage.COMBAT()
		);
	}

	stop(): void {
		const chat: Chat = this._container.get(Chat.name);
		chat.addChatMessage(
			"Stopping level " + this._levelNumber,
			ChatMessage.COMBAT()
		);
		this._enemyList = new Map();
		this._heroListForFight = new Map();
	}

	getCurrentEnemy(): StackPlayCard {
		const currentEnemy: StackPlayCard = this._enemyList.get(this._currentPositionOfEnemyInList.toString());
		if (currentEnemy) { 
			return (currentEnemy.isAlive()) ? currentEnemy : this.#getNextEnemy();
		} else {
			return null;
		}
	}

	getCurrentHero(): StackPlayCard {
		const currentPositionOfHeroInList: StackPlayCard = this._heroListForFight.get(this._currentPositionOfHeroInList.toString());
		return (currentPositionOfHeroInList.isAlive()) ? currentPositionOfHeroInList : this.#getNextAliveHero();
	}

	setNextHero(): StackPlayCard {
		return this.#getNextAliveHero();
	}

	#generateEnemyList(currentWorld:AbstractWorld): void {
		let idListCard = Level.ZERO();
		const currentLevel: WorldLevel = currentWorld.getWorldLeveldByNumber(this._levelNumber);
		currentLevel.getMonsterList().forEach((enemy: Enemy, uuid) => {
            this._enemyList.set(idListCard.toString(), enemy.getStackPlayCard());
            idListCard++;
        });
	}

	// Map of cards with id from 0 to n
	#generateHeroListForFight(): void {
		let idListCard = Level.ZERO();
		const deck = this._container.get(Deck.name);
		deck.getCardList().forEach((hero: Hero, uuid) => {
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