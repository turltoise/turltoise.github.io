var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StackPlayCard_instances, _StackPlayCard_computeStat, _StackPlayCard_aggregatedStatOfAllSoloCardLinkToThisAggregateCard, _StackPlayCard_checkBuffForCarac;
import PhysicalAttack from '../Fight/Capacity/List/PhysicalAttack.js';
import UUID from '../Tools/UUID.js';
import AbstractPrintableCard from './AbstractPrintableCard.js';
class StackPlayCard extends AbstractPrintableCard {
    constructor(playCardMap) {
        super(playCardMap.get('this').getTitle(), playCardMap.get('this').getImg(), playCardMap.get('this').getUUID());
        _StackPlayCard_instances.add(this);
        this._sMap = playCardMap;
        this._statusList = new Map();
        this._currentLife = this.getLife();
        this._currentShield = 0;
    }
    getMainPlayCard() { return this._sMap.get('this'); }
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
    getStrength() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getStrength'); }
    getDexterity() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getDexterity'); }
    getIntelligence() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getIntelligence'); }
    getLuck() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getLuck'); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getPhysicalDamage'); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getPhysicalCriticalRate'); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getPhysicalCriticalNumber'); }
    getMagicDamage() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getMagicDamage'); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getMagicCriticalRate'); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getMagicCriticalNumber'); }
    getFireResistance() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getFireResistance'); }
    getWaterResistance() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getWaterResistance'); }
    getPlantResistance() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getPlantResistance'); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getNecromancyResistance'); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getBlessingResistance'); }
    getArmor() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getArmor'); }
    getAccuracy() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getAccuracy'); }
    getEscape() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getEscape'); }
    getLife() { return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_computeStat).call(this, 'getLife'); }
    getCapacities() {
        let capacities = new Map();
        this._sMap.forEach((computedCard) => {
            capacities = new Map([...capacities, ...computedCard.getCapacities()]);
            ;
        });
        return capacities;
    }
    getRandomCapacity(state) {
        let capacities = new Map();
        this._sMap.forEach((computedCard) => {
            capacities = new Map([...capacities, ...computedCard.getCapacities()]);
            ;
        });
        let keys = Array.from(capacities.keys());
        let capacity = capacities.get(keys[Math.floor(Math.random() * keys.length)]);
        if (!capacity) {
            capacity = new PhysicalAttack(state);
        }
        return capacity;
    }
}
_StackPlayCard_instances = new WeakSet(), _StackPlayCard_computeStat = function _StackPlayCard_computeStat(methodName) {
    return __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_aggregatedStatOfAllSoloCardLinkToThisAggregateCard).call(this, methodName) + __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_checkBuffForCarac).call(this, methodName);
}, _StackPlayCard_aggregatedStatOfAllSoloCardLinkToThisAggregateCard = function _StackPlayCard_aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) {
    let stat = 0;
    this._sMap.forEach((computedCard) => {
        stat += computedCard[methodName]();
    });
    return stat;
}, _StackPlayCard_checkBuffForCarac = function _StackPlayCard_checkBuffForCarac(methodName) {
    let stat = 0;
    this._statusList.forEach((status) => {
        if (typeof status.getBuff()[methodName] !== "undefined") {
            stat += status.getBuff()[methodName]();
        }
    });
    return stat;
};
export default StackPlayCard;
//# sourceMappingURL=StackPlayCard.js.map