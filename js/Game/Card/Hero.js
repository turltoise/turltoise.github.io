import AggregateCardComputedForFight from "./AggregateCardComputedForFight.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";
import UUID from "../Tools/UUID.js";
class Hero extends RawCardLevelComputed {
    constructor(rawCarac, level, title, img, capacities = new Map()) {
        super(rawCarac, level, title, img, capacities);
        this._itemList = new Map();
    }
    addItem(item) {
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
    getObjecForFight() {
        const soloCardComputedMap = this._itemList;
        soloCardComputedMap.set('this', this);
        return new AggregateCardComputedForFight(soloCardComputedMap);
    }
}
export default Hero;
//# sourceMappingURL=Hero.js.map