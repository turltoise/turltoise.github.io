import Status from '../Fight/Status/Status.js';
import UUID from '../Tools/UUID.js';
import CardAnimation from './CardAnimation.js';
import RawCardLevelComputed from './RawCardLevelComputed.js';


class AggregateCardComputedForFight {
	private _sMap: Map<string, RawCardLevelComputed>;
	private _statusList: Map<string, Status>;
	private _currentLife: number;
	private _currentShield: number;

	constructor(soloCardComputedForFightMap: Map<string, RawCardLevelComputed>) {
		this._sMap = soloCardComputedForFightMap;
		this._statusList = new Map<string, Status>();
		this._currentLife = this.getLife();
		this._currentShield = 0;
	}

	getMainRawCard() : RawCardLevelComputed{
		return this._sMap.get('this');
	}

	getTitle(): string {
		return this._sMap.get('this').getTitle();
	}

	getImg(): string {
		return this._sMap.get('this').getImg();
	}

	getUUID(): string {
		return this._sMap.get('this').getUUID();
	}

	getAnimationMap(): Map<string, CardAnimation> {
		return this._sMap.get('this').getAnimationMap();
	}

	addAnimation(animation: CardAnimation, uuid: string): void {
		this._sMap.get('this').addAnimation(animation, uuid);
	}

	resetAnimationMap(): void {
		this._sMap.get('this').resetAnimationMap();
	}

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

	getStrength() 		{return this.#computeStat('getStrength');}
	getDexterity() 		{return this.#computeStat('getDexterity');}
	getIntelligence() 	{return this.#computeStat('getIntelligence');}
	getLuck() 			{return this.#computeStat('getLuck');}

	getPhysicalDamage() 		{return this.#computeStat('getPhysicalDamage');}
	getPhysicalCriticalRate() 	{return this.#computeStat('getPhysicalCriticalRate');}
	getPhysicalCriticalNumber() {return this.#computeStat('getPhysicalCriticalNumber');}

	getMagicDamage() 			{return this.#computeStat('getMagicDamage');}
	getMagicCriticalRate() 		{return this.#computeStat('getMagicCriticalRate');}
	getMagicCriticalNumber() 	{return this.#computeStat('getMagicCriticalNumber');}

	getFireResistance() 		{return this.#computeStat('getFireResistance');}
	getWaterResistance() 		{return this.#computeStat('getWaterResistance');}
	getPlantResistance() 		{return this.#computeStat('getPlantResistance');}
	getNecromancyResistance() 	{return this.#computeStat('getNecromancyResistance');}
	getBlessingResistance() 	{return this.#computeStat('getBlessingResistance');}
	getArmor() 					{return this.#computeStat('getArmor');}

	getAccuracy() 				{return this.#computeStat('getAccuracy');}
	getEscape() 				{return this.#computeStat('getEscape');}

	getLife() 					{return this.#computeStat('getLife');}

	#computeStat(methodName) {
		return this.#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) + this.#checkBuffForCarac(methodName);
	}

	#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) {
		let stat = 0;
		this._sMap.forEach((computedCard) => {
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

export default AggregateCardComputedForFight;