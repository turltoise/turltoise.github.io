var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Item_instances, _Item_computeMainStat, _Item_computeSecondaryStat, _Item_computeLifeStat, _Item_getMultiplierRarity;
import CollectionCard from "./CollectionCard.js";
import ItemRarity from "./ItemRarity.js";
class Item extends CollectionCard {
    constructor(container, rawCarac, level, title, img, capacities = new Map(), cardGraphicSetting, uuid) {
        super(container, rawCarac, level, title, img, capacities, uuid, cardGraphicSetting);
        _Item_instances.add(this);
        this._heroLinked = null;
    }
    setRarity(rarity) { this._rarity = rarity; }
    getRarity() { return this._rarity; }
    isItem() { return true; }
    isHeroLinked() { return (this._heroLinked) ? true : false; }
    getHeroLinked() { return this._heroLinked; }
    removeHeroLinked() { this._heroLinked = null; }
    setHeroLinked(hero) { this._heroLinked = hero; }
    getStrength() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeMainStat).call(this, super.getStrength()); }
    getDexterity() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeMainStat).call(this, super.getDexterity()); }
    getIntelligence() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeMainStat).call(this, super.getIntelligence()); }
    getLuck() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeMainStat).call(this, super.getLuck()); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getPhysicalDamage()); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getPhysicalCriticalRate()); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getPhysicalCriticalNumber()); }
    getMagicDamage() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getMagicDamage()); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getMagicCriticalRate()); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getMagicCriticalNumber()); }
    getFireResistance() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getFireResistance()); }
    getWaterResistance() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getWaterResistance()); }
    getPlantResistance() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getPlantResistance()); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getNecromancyResistance()); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getBlessingResistance()); }
    getArmor() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getArmor()); }
    getAccuracy() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getAccuracy()); }
    getEscape() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeSecondaryStat).call(this, super.getEscape()); }
    getLife() { return __classPrivateFieldGet(this, _Item_instances, "m", _Item_computeLifeStat).call(this, super.getLife()); }
}
_Item_instances = new WeakSet(), _Item_computeMainStat = function _Item_computeMainStat(raw) { return Math.ceil(__classPrivateFieldGet(this, _Item_instances, "m", _Item_getMultiplierRarity).call(this) * raw); }, _Item_computeSecondaryStat = function _Item_computeSecondaryStat(raw) { return Math.ceil(__classPrivateFieldGet(this, _Item_instances, "m", _Item_getMultiplierRarity).call(this) * raw); }, _Item_computeLifeStat = function _Item_computeLifeStat(raw) { return Math.ceil(__classPrivateFieldGet(this, _Item_instances, "m", _Item_getMultiplierRarity).call(this) * raw); }, _Item_getMultiplierRarity = function _Item_getMultiplierRarity() {
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
};
export default Item;
//# sourceMappingURL=Item.js.map