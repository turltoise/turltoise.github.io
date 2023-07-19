import UUID from "../Tools/UUID.js";
import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import CardAnimation from "./CardAnimation.js";
import RawCarac from "./RawCarac.js";

class RawCardLevelComputed {
	private _rawCarac: RawCarac;
	private _uuid: string;
	private _level: number;
	private _title: string;
	private _img: string;
	private _animation: Map<string, CardAnimation>;

	constructor(rawCarac, level, title, img) {
		this._rawCarac = rawCarac;
		this._uuid = UUID.generateUUID();
		this._level = level;
		this._title = title;
		this._img = img;
		this._animation = new Map();
	}
	getObjecForFight(): AggregateCardComputedForFight {return null;}
	getUUID() {return this._uuid;}
	getTitle() {return this._title;}
	getImg() {return this._img;}
	getLevel() {return this._level;}

	getAnimationMap() {return this._animation;}
	addAnimation(animation, uuid=UUID.generateUUID()) {
		this._animation.set(uuid, animation);
	}
	resetAnimationMap() {this._animation = new Map();}
	getStrength() {		return this.#computeMainStat(this._rawCarac._rawStrength);}
	getDexterity() {		return this.#computeMainStat(this._rawCarac._rawDexterity);}
	getIntelligence() {	return this.#computeMainStat(this._rawCarac._rawIntelligence);}
	getLuck() {			return this.#computeMainStat(this._rawCarac._rawLuck);}

	getPhysicalDamage() {		return this.#computeSecondaryStat(this._rawCarac._rawPhysicalDamage);}
	getPhysicalCriticalRate() {	return this.#computeSecondaryStat(this._rawCarac._rawPhysicalCriticalRate);}
	getPhysicalCriticalNumber() {return this.#computeSecondaryStat(this._rawCarac._rawPhysicalCriticalNumber);}

	getMagicDamage() {			return this.#computeSecondaryStat(this._rawCarac._rawMagicDamage);}
	getMagicCriticalRate() {		return this.#computeSecondaryStat(this._rawCarac._rawMagicCriticalRate);}
	getMagicCriticalNumber() {	return this.#computeSecondaryStat(this._rawCarac._rawMagicCriticalNumber);}

	getFireResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawFireResistance);}
	getWaterResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawWaterResistance);}
	getPlantResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawPlantResistance);}
	getNecromancyResistance() {	return this.#computeSecondaryStat(this._rawCarac._rawNecromancyResistance);}
	getBlessingResistance() {	return this.#computeSecondaryStat(this._rawCarac._rawBlessingResistance);}
	getArmor() {					return this.#computeSecondaryStat(this._rawCarac._rawArmor);}

	getAccuracy() {	return this.#computeSecondaryStat(this._rawCarac._rawAccuracy);}
	getEscape() {	return this.#computeSecondaryStat(this._rawCarac._rawEscape);}

	getLife() {	return this.#computeLifeStat(this._rawCarac._rawLife);}

	#computeMainStat(raw) {
		return raw + Math.floor(this._level * raw / 2);
	}

	#computeSecondaryStat(raw) {
		return raw + Math.floor(this._level * raw / 6);
	}

	#computeLifeStat(raw) {
		return raw + Math.floor(this._level * raw * 4 / 10);
	}
}

export default RawCardLevelComputed;

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