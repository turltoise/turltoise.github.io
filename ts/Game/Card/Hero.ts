import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";
import Item from "./Item.js";
import UUID from "../Tools/UUID.js";
import RawCarac from "./RawCarac.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import PhysicalAttack from "../Fight/Capacity/List/PhysicalAttack.js";

class Hero extends RawCardLevelComputed {
	private _itemList: Map<string, Item>;

	constructor(rawCarac: RawCarac, level: number, title: string, img: string, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(rawCarac, level, title, img, capacities);
		this._itemList = new Map(); 
	}

	addItem(item : Item) {
		item = item;
		this._itemList.set(UUID.generateUUID(), item);
	}

	removeItemWithUUID(uuid) {
		return this._itemList.delete(uuid);
	}

	getItemWithUUID(uuid) {
		return this._itemList.get(uuid);
	}

	getItemMap() {
		return this._itemList;
	}

	getObjecForFight(): AggregateCardComputedForFight {
		const soloCardComputedMap = this._itemList;
		soloCardComputedMap.set('this', this);
		return new AggregateCardComputedForFight(soloCardComputedMap);
	}
}

export default Hero;