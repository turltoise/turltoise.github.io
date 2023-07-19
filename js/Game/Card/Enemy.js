import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";
class Enemy extends RawCardLevelComputed {
    constructor(rawCarac, level, title, img, gold = 5) {
        super(rawCarac, level, title, img);
        this._gold = gold;
    }
    getObjecForFight() {
        const soloCardComputedMap = new Map();
        soloCardComputedMap.set('this', this);
        return new AggregateCardComputedForFight(soloCardComputedMap);
    }
    getGold() {
        return this._gold;
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map