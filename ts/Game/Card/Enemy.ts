import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";

class Enemy extends RawCardLevelComputed {
	private _gold: number;

	constructor(rawCarac, level, title, img, gold=5) {
		super(rawCarac, level, title, img);
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