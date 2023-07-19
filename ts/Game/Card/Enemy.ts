import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import RawCarac from "./RawCarac.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";

class Enemy extends RawCardLevelComputed {
	private _gold: number;

	constructor(rawCarac: RawCarac, level: number, title: string, img: string, gold: number = 5, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(rawCarac, level, title, img, capacities);
		this._gold = gold;
	}

	getObjecForFight(): AggregateCardComputedForFight {
		const soloCardComputedMap = new Map();
		soloCardComputedMap.set('this', this);
		return new AggregateCardComputedForFight(soloCardComputedMap);
	}

	getGold() {
		return this._gold;
	}
}

export default Enemy;