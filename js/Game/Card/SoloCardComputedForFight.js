var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SoloCardComputedForFight_instances, _SoloCardComputedForFight_computeForFight;
class SoloCardComputedForFight {
    constructor(rawCardLevelComputed) {
        _SoloCardComputedForFight_instances.add(this);
        this._c = rawCardLevelComputed;
    }
    getStrength() { return this._c.getStrength(); }
    getDexterity() { return this._c.getDexterity(); }
    getIntelligence() { return this._c.getIntelligence(); }
    getLuck() { return this._c.getLuck(); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getPhysicalDamage(), this._c.getStrength()); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getPhysicalCriticalRate(), this._c.getDexterity()); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getPhysicalCriticalNumber(), this._c.getDexterity()); }
    getMagicDamage() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getMagicDamage(), this._c.getIntelligence()); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getMagicCriticalRate(), this._c.getLuck()); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getMagicCriticalNumber(), this._c.getLuck()); }
    getFireResistance() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getFireResistance(), this._c.getIntelligence()); }
    getWaterResistance() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getWaterResistance(), this._c.getIntelligence()); }
    getPlantResistance() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getPlantResistance(), this._c.getIntelligence()); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getNecromancyResistance(), this._c.getIntelligence()); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getBlessingResistance(), this._c.getIntelligence()); }
    getArmor() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getArmor(), this._c.getStrength()); }
    getAccuracy() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getAccuracy(), (Math.floor(this._c.getDexterity() + this._c.getLuck() / 2))); }
    getEscape() { return __classPrivateFieldGet(this, _SoloCardComputedForFight_instances, "m", _SoloCardComputedForFight_computeForFight).call(this, this._c.getEscape(), (Math.floor(this._c.getDexterity() + this._c.getLuck() / 2))); }
    getLife() { return this._c.getLife(); }
}
_SoloCardComputedForFight_instances = new WeakSet(), _SoloCardComputedForFight_computeForFight = function _SoloCardComputedForFight_computeForFight(currentStat, mainStat) {
    return currentStat + Math.floor(mainStat / 10);
};
export default SoloCardComputedForFight;
//# sourceMappingURL=SoloCardComputedForFight.js.map