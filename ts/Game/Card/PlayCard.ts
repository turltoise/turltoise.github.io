import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import CollectionCard from "./CollectionCard.js";

class PlayCard {
	private _c: CollectionCard;
	constructor(collectionCard: CollectionCard) {
		this._c =collectionCard;
	}

	getUUID(): string {return this._c.getUUID();}
	getTitle(): string {return this._c.getTitle();}
	getImg(): string {return this._c.getImg();}
	getLevel(): number {return this._c.getLevel();}
	getCapacities():  Map<string, AbstractCapacity> {return this._c.getCapacities();}

	getStrength(): number {		return this._c.getStrength()}
	getDexterity(): number {	return this._c.getDexterity();}
	getIntelligence(): number {	return this._c.getIntelligence();}
	getLuck(): number {			return this._c.getLuck();}

	getPhysicalDamage(): number {			return this.#computeForFight(this._c.getPhysicalDamage(),			this._c.getStrength());}
	getPhysicalCriticalRate(): number {		return this.#computeForFight(this._c.getPhysicalCriticalRate(),		this._c.getDexterity());}
	getPhysicalCriticalNumber(): number {	return this.#computeForFight(this._c.getPhysicalCriticalNumber(),	this._c.getDexterity());}

	getMagicDamage(): number {			return this.#computeForFight(this._c.getMagicDamage(),			this._c.getIntelligence());}
	getMagicCriticalRate(): number {	return this.#computeForFight(this._c.getMagicCriticalRate(),	this._c.getLuck());}
	getMagicCriticalNumber(): number {	return this.#computeForFight(this._c.getMagicCriticalNumber(),	this._c.getLuck());}

	getFireResistance(): number {		return this.#computeForFight(this._c.getFireResistance(),			this._c.getIntelligence());}
	getWaterResistance(): number {		return this.#computeForFight(this._c.getWaterResistance(),			this._c.getIntelligence());}
	getPlantResistance(): number {		return this.#computeForFight(this._c.getPlantResistance(),			this._c.getIntelligence());}
	getNecromancyResistance(): number {	return this.#computeForFight(this._c.getNecromancyResistance(),		this._c.getIntelligence());}
	getBlessingResistance(): number {	return this.#computeForFight(this._c.getBlessingResistance(),		this._c.getIntelligence());}
	getArmor(): number {				return this.#computeForFight(this._c.getArmor(),					this._c.getStrength());}

	getAccuracy(): number {				return this.#computeForFight(this._c.getAccuracy(),	(Math.floor(this._c.getDexterity() + this._c.getLuck() / 2)));}
	getEscape(): number {				return this.#computeForFight(this._c.getEscape(),	(Math.floor(this._c.getDexterity() + this._c.getLuck() / 2)));}

	getLife(): number {					return this._c.getLife();}

	#computeForFight(currentStat: number, mainStat: number): number {
		return currentStat + Math.floor(mainStat / 10);
	}
}

export default PlayCard;