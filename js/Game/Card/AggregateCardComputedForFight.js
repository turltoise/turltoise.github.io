var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _AggregateCardComputedForFight_instances, _AggregateCardComputedForFight_computeStat, _AggregateCardComputedForFight_aggregatedStatOfAllSoloCardLinkToThisAggregateCard, _AggregateCardComputedForFight_checkBuffForCarac;
import UUID from '../Tools/UUID.js';
class AggregateCardComputedForFight {
    constructor(soloCardComputedForFightMap) {
        _AggregateCardComputedForFight_instances.add(this);
        this._sMap = soloCardComputedForFightMap;
        this._statusList = new Map();
        this._currentLife = this.getLife();
        this._currentShield = 0;
    }
    getMainRawCard() {
        return this._sMap.get('this');
    }
    getTitle() {
        return this._sMap.get('this').getTitle();
    }
    getImg() {
        return this._sMap.get('this').getImg();
    }
    getUUID() {
        return this._sMap.get('this').getUUID();
    }
    getAnimationMap() {
        return this._sMap.get('this').getAnimationMap();
    }
    addAnimation(animation, uuid) {
        this._sMap.get('this').addAnimation(animation, uuid);
    }
    resetAnimationMap() {
        this._sMap.get('this').resetAnimationMap();
    }
    isAlive() {
        return (this._currentLife > 0) ? true : false;
    }
    heal(heal) {
        this._currentLife += heal;
        this._currentLife = (this._currentLife > this.getLife()) ? this.getLife() : this._currentLife;
    }
    shield(shield) {
        this._currentShield += shield;
    }
    dmg(dmg) {
        if (this._currentShield > 0) {
            let leftShield = this._currentShield - dmg;
            let leftDmg = dmg - this._currentShield;
            if (leftShield > 0) {
                this._currentShield = leftShield;
            }
            else {
                dmg = leftDmg;
            }
        }
        this._currentLife -= dmg;
    }
    addStatus(status) {
        this._statusList.set(UUID.generateUUID(), status);
    }
    triggerStatus() {
        this._statusList.forEach((status, id) => {
            if (status.getTick()) {
                status.getTick().tick();
            }
            status.setTurn(status.getTurn() - 1);
            if (status.getTurn() <= 0) {
                this._statusList.delete(id);
            }
        });
    }
    getStrength() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getStrength'); }
    getDexterity() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getDexterity'); }
    getIntelligence() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getIntelligence'); }
    getLuck() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getLuck'); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getPhysicalDamage'); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getPhysicalCriticalRate'); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getPhysicalCriticalNumber'); }
    getMagicDamage() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getMagicDamage'); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getMagicCriticalRate'); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getMagicCriticalNumber'); }
    getFireResistance() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getFireResistance'); }
    getWaterResistance() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getWaterResistance'); }
    getPlantResistance() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getPlantResistance'); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getNecromancyResistance'); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getBlessingResistance'); }
    getArmor() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getArmor'); }
    getAccuracy() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getAccuracy'); }
    getEscape() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getEscape'); }
    getLife() { return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_computeStat).call(this, 'getLife'); }
    getCapacities() {
        let capacities = new Map();
        this._sMap.forEach((computedCard) => {
            capacities = new Map([...capacities, ...computedCard.getCapacities()]);
            ;
        });
        return capacities;
    }
    getRandomCapacity() {
        let capacities = new Map();
        this._sMap.forEach((computedCard) => {
            capacities = new Map([...capacities, ...computedCard.getCapacities()]);
            ;
        });
        let keys = Array.from(capacities.keys());
        return capacities.get(keys[Math.floor(Math.random() * keys.length)]);
    }
}
_AggregateCardComputedForFight_instances = new WeakSet(), _AggregateCardComputedForFight_computeStat = function _AggregateCardComputedForFight_computeStat(methodName) {
    return __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_aggregatedStatOfAllSoloCardLinkToThisAggregateCard).call(this, methodName) + __classPrivateFieldGet(this, _AggregateCardComputedForFight_instances, "m", _AggregateCardComputedForFight_checkBuffForCarac).call(this, methodName);
}, _AggregateCardComputedForFight_aggregatedStatOfAllSoloCardLinkToThisAggregateCard = function _AggregateCardComputedForFight_aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) {
    let stat = 0;
    this._sMap.forEach((computedCard) => {
        stat += computedCard[methodName]();
    });
    return stat;
}, _AggregateCardComputedForFight_checkBuffForCarac = function _AggregateCardComputedForFight_checkBuffForCarac(methodName) {
    let stat = 0;
    this._statusList.forEach((status) => {
        if (typeof status.getBuff()[methodName] !== "undefined") {
            stat += status.getBuff()[methodName]();
        }
    });
    return stat;
};
export default AggregateCardComputedForFight;
//# sourceMappingURL=AggregateCardComputedForFight.js.map