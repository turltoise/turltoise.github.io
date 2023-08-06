import UUID from "../Tools/UUID.js";
import StackPlayCard from "./StackPlayCard.js";
import RawCarac from "./RawCarac.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import PlayCard from "./PlayCard.js";
import AbstractPrintableCard from "./AbstractPrintableCard.js";
import Container from "../../Container.js";
import CardGraphicSetting from "./CardGraphicSetting.js";

/**
 * Use in collection and shop : to display raw carac of leveled card 
 */
class CollectionCard extends AbstractPrintableCard {
	private _rawCarac: RawCarac;
	private _capacities: Map<string, AbstractCapacity>

	constructor(
		container: Container,
		rawCarac: RawCarac,
		level: number,
		title: string,
		img: string,
		capacities: Map<string, AbstractCapacity> = new Map(),
		uuid: string,
		cardGraphicSetting: CardGraphicSetting
	) {
		super(container, title, img, uuid, cardGraphicSetting, level);
		this._rawCarac = rawCarac;
		this._capacities = capacities;
	}
	getPlayCard() : PlayCard {return new PlayCard(this);}
	getStackPlayCard(): StackPlayCard {return null;}
	getLevel(): number {return this._level;}
	getCurrentLife(): number {return this.getLife();}
	getMaxLife(): number {return this.getLife();}

	getGold(): number {return null;}

	getCapacities():  Map<string, AbstractCapacity> {return this._capacities;}
	addCapacity(capacity : AbstractCapacity) : void {this._capacities.set(UUID.generateUUID(), capacity);}
	getCapacityByUUID(uuid: string) : AbstractCapacity {return this._capacities.get(uuid);}
	getRandomCapacity(): AbstractCapacity {
		let keys = Array.from(this._capacities.keys());
		return this._capacities.get(keys[Math.floor(Math.random() * keys.length)])
	}

	getStrength() {		return this.#computeMainStat(this._rawCarac._rawStrength);}
	getDexterity() {	return this.#computeMainStat(this._rawCarac._rawDexterity);}
	getIntelligence() {	return this.#computeMainStat(this._rawCarac._rawIntelligence);}
	getLuck() {			return this.#computeMainStat(this._rawCarac._rawLuck);}

	getPhysicalDamage() {		return this.#computeSecondaryStat(this._rawCarac._rawPhysicalDamage);}
	getPhysicalCriticalRate() {	return this.#computeSecondaryStat(this._rawCarac._rawPhysicalCriticalRate);}
	getPhysicalCriticalNumber() {return this.#computeSecondaryStat(this._rawCarac._rawPhysicalCriticalNumber);}

	getMagicDamage() {			return this.#computeSecondaryStat(this._rawCarac._rawMagicDamage);}
	getMagicCriticalRate() {	return this.#computeSecondaryStat(this._rawCarac._rawMagicCriticalRate);}
	getMagicCriticalNumber() {	return this.#computeSecondaryStat(this._rawCarac._rawMagicCriticalNumber);}

	getFireResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawFireResistance);}
	getWaterResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawWaterResistance);}
	getPlantResistance() {		return this.#computeSecondaryStat(this._rawCarac._rawPlantResistance);}
	getNecromancyResistance() {	return this.#computeSecondaryStat(this._rawCarac._rawNecromancyResistance);}
	getBlessingResistance() {	return this.#computeSecondaryStat(this._rawCarac._rawBlessingResistance);}
	getArmor() {				return this.#computeSecondaryStat(this._rawCarac._rawArmor);}

	getAccuracy() {	return this.#computeSecondaryStat(this._rawCarac._rawAccuracy);}
	getEscape() {	return this.#computeSecondaryStat(this._rawCarac._rawEscape);}

	getLife() {	return this.#computeLifeStat(this._rawCarac._rawLife);}

	#computeMainStat(raw) {return raw + Math.floor(this._level * raw / 2);}
	#computeSecondaryStat(raw) {return raw + Math.floor(this._level * raw / 6);}
	#computeLifeStat(raw) {return raw + Math.floor(this._level * raw * 4 / 10);}
}

export default CollectionCard;