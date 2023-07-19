import RawCardLevelComputed from "./RawCardLevelComputed.js";

class SoloCardComputedForFight {
	private _c: RawCardLevelComputed;
	constructor(rawCardLevelComputed) {
		this._c = rawCardLevelComputed;
	}

	getStrength() {		return this._c.getStrength()}
	getDexterity() {	return this._c.getDexterity();}
	getIntelligence() {	return this._c.getIntelligence();}
	getLuck() {			return this._c.getLuck();}

	getPhysicalDamage() {			return this.#computeForFight(this._c.getPhysicalDamage(),			this._c.getStrength());}
	getPhysicalCriticalRate() {		return this.#computeForFight(this._c.getPhysicalCriticalRate(),		this._c.getDexterity());}
	getPhysicalCriticalNumber() {	return this.#computeForFight(this._c.getPhysicalCriticalNumber(),	this._c.getDexterity());}

	getMagicDamage() {			return this.#computeForFight(this._c.getMagicDamage(),			this._c.getIntelligence());}
	getMagicCriticalRate() {	return this.#computeForFight(this._c.getMagicCriticalRate(),	this._c.getLuck());}
	getMagicCriticalNumber() {	return this.#computeForFight(this._c.getMagicCriticalNumber(),	this._c.getLuck());}

	getFireResistance() {		return this.#computeForFight(this._c.getFireResistance(),			this._c.getIntelligence());}
	getWaterResistance() {		return this.#computeForFight(this._c.getWaterResistance(),			this._c.getIntelligence());}
	getPlantResistance() {		return this.#computeForFight(this._c.getPlantResistance(),			this._c.getIntelligence());}
	getNecromancyResistance() {	return this.#computeForFight(this._c.getNecromancyResistance(),		this._c.getIntelligence());}
	getBlessingResistance() {	return this.#computeForFight(this._c.getBlessingResistance(),		this._c.getIntelligence());}
	getArmor() {				return this.#computeForFight(this._c.getArmor(),					this._c.getStrength());}

	getAccuracy() {				return this.#computeForFight(this._c.getAccuracy(),	(Math.floor(this._c.getDexterity() + this._c.getLuck() / 2)));}
	getEscape() {				return this.#computeForFight(this._c.getEscape(),	(Math.floor(this._c.getDexterity() + this._c.getLuck() / 2)));}

	getLife() {					return this._c.getLife();}

	#computeForFight(currentStat, mainStat) {
		return currentStat + Math.floor(mainStat / 10);
	}
}

export default SoloCardComputedForFight;