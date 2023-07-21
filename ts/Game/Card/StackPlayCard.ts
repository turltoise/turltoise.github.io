import AbstractCapacity from '../Fight/Capacity/List/AbstractCapacity.js';
import PhysicalAttack from '../Fight/Capacity/List/PhysicalAttack.js';
import Status from '../Fight/Status/Status.js';
import State from '../State/State.js';
import UUID from '../Tools/UUID.js';
import AbstractPrintableCard from './AbstractPrintableCard.js';
import PlayCard from './PlayCard.js';

class StackPlayCard extends AbstractPrintableCard {
	private _sMap: Map<string, PlayCard>;
	private _statusList: Map<string, Status>;
	private _currentLife: number;
	private _currentShield: number;
	

	constructor(playCardMap: Map<string, PlayCard>) {
		super(
			playCardMap.get('this').getTitle(),
			playCardMap.get('this').getImg(),
			playCardMap.get('this').getUUID()
		);
		this._sMap = playCardMap;
		this._statusList = new Map<string, Status>();
		this._currentLife = this.getLife();
		this._currentShield = 0;
		
	}

	getMainPlayCard() : PlayCard {return this._sMap.get('this');}

	isAlive(): boolean {
		return (this._currentLife > 0) ? true : false;
	}

	heal(heal: number): void {
		this._currentLife += heal;
		this._currentLife = (this._currentLife > this.getLife()) ? this.getLife() : this._currentLife;
	}

	shield(shield: number): void {
		this._currentShield += shield;
	}

	dmg(dmg: number): void {
		if (this._currentShield > 0) {
			let leftShield = this._currentShield - dmg;
			let leftDmg = dmg - this._currentShield;
			if (leftShield > 0) {
				this._currentShield = leftShield;
			} else {
				dmg = leftDmg;
			}
		}
		this._currentLife -= dmg;
	}

	addStatus(status: Status): void {
		this._statusList.set(UUID.generateUUID(), status);
	}

	triggerStatus(): void {
		this._statusList.forEach((status: Status, id) => {
			if (status.getTick()) {
				status.getTick().tick();
			}
			status.setTurn(status.getTurn()-1);
			if (status.getTurn() <= 0) {
				this._statusList.delete(id);
			}
		});
	}

	getStrength(): number 		{return this.#computeStat('getStrength');}
	getDexterity(): number 		{return this.#computeStat('getDexterity');}
	getIntelligence(): number 	{return this.#computeStat('getIntelligence');}
	getLuck(): number 			{return this.#computeStat('getLuck');}

	getPhysicalDamage(): number 		{return this.#computeStat('getPhysicalDamage');}
	getPhysicalCriticalRate(): number 	{return this.#computeStat('getPhysicalCriticalRate');}
	getPhysicalCriticalNumber(): number {return this.#computeStat('getPhysicalCriticalNumber');}

	getMagicDamage(): number 			{return this.#computeStat('getMagicDamage');}
	getMagicCriticalRate(): number 		{return this.#computeStat('getMagicCriticalRate');}
	getMagicCriticalNumber(): number 	{return this.#computeStat('getMagicCriticalNumber');}

	getFireResistance(): number 		{return this.#computeStat('getFireResistance');}
	getWaterResistance(): number 		{return this.#computeStat('getWaterResistance');}
	getPlantResistance(): number 		{return this.#computeStat('getPlantResistance');}
	getNecromancyResistance(): number 	{return this.#computeStat('getNecromancyResistance');}
	getBlessingResistance(): number 	{return this.#computeStat('getBlessingResistance');}
	getArmor(): number 					{return this.#computeStat('getArmor');}

	getAccuracy(): number 				{return this.#computeStat('getAccuracy');}
	getEscape(): number 				{return this.#computeStat('getEscape');}

	getLife(): number 					{return this.#computeStat('getLife');}

	getCapacities(): Map<string, AbstractCapacity> {
		let capacities = <Map<string, AbstractCapacity>> new Map();
		this._sMap.forEach((computedCard: PlayCard) => {
			capacities = new Map([...capacities, ...computedCard.getCapacities()]);;
		});
		return capacities;
	}

	getRandomCapacity(state: State): AbstractCapacity {
		let capacities = <Map<string, AbstractCapacity>> new Map();
		this._sMap.forEach((computedCard: PlayCard) => {
			capacities = new Map([...capacities, ...computedCard.getCapacities()]);;
		});
		let keys = Array.from(capacities.keys());
		let capacity: AbstractCapacity = capacities.get(keys[Math.floor(Math.random() * keys.length)]);
		
		if (!capacity) {capacity = new PhysicalAttack(state);}
		return capacity;
	}

	#computeStat(methodName: string): number {
		return this.#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) + this.#checkBuffForCarac(methodName);
	}

	#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName: string): number {
		let stat = 0;
		this._sMap.forEach((computedCard: PlayCard) => {
			stat+=computedCard[methodName]();
		});
		return stat;
	}

	#checkBuffForCarac(methodName) {
		let stat = 0;
		this._statusList.forEach((status: Status) => {
			if (typeof status.getBuff()[methodName] !== "undefined") { 
				stat+=status.getBuff()[methodName]();
			}
		});
		return stat;
	}
}
export default StackPlayCard;