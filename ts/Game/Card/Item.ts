import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import Container from "../../Container.js";
import CardGraphicSetting from "./CardGraphicSetting.js";
import Hero from "./Hero.js";
import ItemRarity from "./ItemRarity.js";

class Item extends CollectionCard {
	private _heroLinked: Hero;
	private _rarity: string;
	constructor(
		container: Container,
		rawCarac: RawCarac,
		level: number,
		title: string,
		img: string, capacities: Map<string,
		AbstractCapacity> = new Map(),
		cardGraphicSetting: CardGraphicSetting,
		uuid: string
	) {
		super(container, rawCarac, level, title, img, capacities, uuid, cardGraphicSetting);
		this._heroLinked =  null;
	}
	setRarity(rarity :string): void {this._rarity = rarity;}
	getRarity(): string {return this._rarity;}

	isItem(): boolean {return true;}

	isHeroLinked(): boolean {return (this._heroLinked)? true : false;}
	getHeroLinked(): Hero {return this._heroLinked;}
	removeHeroLinked(): void {this._heroLinked  = null;}
	setHeroLinked(hero: Hero): void {this._heroLinked  = hero;}

	getStrength() {		return this.#computeMainStat(super.getStrength());}
	getDexterity() {	return this.#computeMainStat(super.getDexterity());}
	getIntelligence() {	return this.#computeMainStat(super.getIntelligence());}
	getLuck() {			return this.#computeMainStat(super.getLuck());}

	getPhysicalDamage() {		return this.#computeSecondaryStat(super.getPhysicalDamage());}
	getPhysicalCriticalRate() {	return this.#computeSecondaryStat(super.getPhysicalCriticalRate());}
	getPhysicalCriticalNumber() {return this.#computeSecondaryStat(super.getPhysicalCriticalNumber());}

	getMagicDamage() {			return this.#computeSecondaryStat(super.getMagicDamage());}
	getMagicCriticalRate() {	return this.#computeSecondaryStat(super.getMagicCriticalRate());}
	getMagicCriticalNumber() {	return this.#computeSecondaryStat(super.getMagicCriticalNumber());}

	getFireResistance() {		return this.#computeSecondaryStat(super.getFireResistance());}
	getWaterResistance() {		return this.#computeSecondaryStat(super.getWaterResistance());}
	getPlantResistance() {		return this.#computeSecondaryStat(super.getPlantResistance());}
	getNecromancyResistance() {	return this.#computeSecondaryStat(super.getNecromancyResistance());}
	getBlessingResistance() {	return this.#computeSecondaryStat(super.getBlessingResistance());}
	getArmor() {				return this.#computeSecondaryStat(super.getArmor());}

	getAccuracy() {	return this.#computeSecondaryStat(super.getAccuracy());}
	getEscape() {	return this.#computeSecondaryStat(super.getEscape());}

	getLife() {	return this.#computeLifeStat(super.getLife());}

	#computeMainStat(raw: number): number 		{return Math.ceil(this.#getMultiplierRarity() * raw);}
	#computeSecondaryStat(raw: number): number 	{return Math.ceil(this.#getMultiplierRarity() * raw);}
	#computeLifeStat(raw: number): number 		{return Math.ceil(this.#getMultiplierRarity() * raw);}

	#getMultiplierRarity(): number {
		switch (this._rarity) {
			case ItemRarity.POOR():
				return 0.80;
			case ItemRarity.COMMON():
				return 0.90;
			case ItemRarity.UNCOMMON():
				return 1;
			case ItemRarity.RARE():
				return 1.1;
			case ItemRarity.EPIC():
				return 1.2;
			case ItemRarity.LEGENDARY():
				return 1.3;
			case ItemRarity.ARTIFACT():
				return 1.4;
			default:
				return 0;
		}
	}
}
export default Item;