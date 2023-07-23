var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CoreCapacity_instances, _CoreCapacity_physicalStrikeDmgGiven, _CoreCapacity_physicalCriticalStrikeDmgGiven, _CoreCapacity_magicalStrikeDmgGiven, _CoreCapacity_magicalCriticalStrikeDmgGiven, _CoreCapacity_physicalDefenseDmgTaken, _CoreCapacity_magicDefenseDmgTaken, _CoreCapacity_touched, _CoreCapacity_multiplicator, _CoreCapacity_computeNormalDamage, _CoreCapacity_isCriticalDamage, _CoreCapacity_computeCriticalDamage, _CoreCapacity_computeDefense, _CoreCapacity_computeElementalResitance, _CoreCapacity_computeRand1on2, _CoreCapacity_rand1To100;
import Element from "../../Element.js";
import CapacityMessage from "../CapacityMessage.js";
class CoreCapacity {
    constructor(container) {
        _CoreCapacity_instances.add(this);
        this._container = container;
    }
    putStatus(attackName, thrower, target, status) {
        if (__classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_touched).call(this, thrower, target)) {
            target.addStatus(status);
            CapacityMessage.putStatus(this._container, attackName, target);
        }
        else {
            CapacityMessage.failed(this._container, attackName);
        }
    }
    annoucementCapacityWithFocus(attackName, thrower, target) {
        CapacityMessage.capacityWithFocus(this._container, attackName, thrower, target);
    }
    heal(thrower, target, power, heal) {
        if (heal === null) {
            heal = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalStrikeDmgGiven).call(this, thrower);
        }
        heal = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_multiplicator).call(this, heal, power);
        target.heal(heal);
        CapacityMessage.heal(this._container, target, heal);
        return heal;
    }
    shield(thrower, target, power, shield) {
        if (shield === null) {
            shield = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalStrikeDmgGiven).call(this, thrower);
        }
        shield = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_multiplicator).call(this, shield, power);
        target.shield(shield);
        CapacityMessage.shield(this._container, target, shield);
        return shield;
    }
    magicProc(attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        let normalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalStrikeDmgGiven).call(this, thrower);
        let criticalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalCriticalStrikeDmgGiven).call(this, thrower);
        let dmgGiven = normalDmg + criticalDmg;
        dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicDefenseDmgTaken).call(this, target, dmgGiven, element);
        dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_multiplicator).call(this, dmgTaken, power);
        target.dmg(dmgTaken);
        CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, element);
        return dmgTaken;
    }
    magicAttack(attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_touched).call(this, thrower, target)) {
            let normalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalStrikeDmgGiven).call(this, thrower);
            let criticalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicalCriticalStrikeDmgGiven).call(this, thrower);
            let dmgGiven = normalDmg + criticalDmg;
            dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_magicDefenseDmgTaken).call(this, target, dmgGiven, element);
            dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_multiplicator).call(this, dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, element);
        }
        else {
            CapacityMessage.failed(this._container, attackName);
        }
        return dmgTaken;
    }
    physicalAttack(attackName, thrower, target, power) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_touched).call(this, thrower, target)) {
            let normalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_physicalStrikeDmgGiven).call(this, thrower);
            let criticalDmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_physicalCriticalStrikeDmgGiven).call(this, thrower);
            let dmgGiven = normalDmg + criticalDmg;
            dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_physicalDefenseDmgTaken).call(this, target, dmgGiven);
            dmgTaken = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_multiplicator).call(this, dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, null);
        }
        else {
            CapacityMessage.failed(this._container, attackName);
        }
        return dmgTaken;
    }
}
_CoreCapacity_instances = new WeakSet(), _CoreCapacity_physicalStrikeDmgGiven = function _CoreCapacity_physicalStrikeDmgGiven(thrower) {
    return __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeNormalDamage).call(this, thrower.getPhysicalDamage());
}, _CoreCapacity_physicalCriticalStrikeDmgGiven = function _CoreCapacity_physicalCriticalStrikeDmgGiven(thrower) {
    let dmg = 0;
    if (__classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_isCriticalDamage).call(this, thrower.getPhysicalCriticalRate())) {
        dmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeCriticalDamage).call(this, thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber());
    }
    return dmg;
}, _CoreCapacity_magicalStrikeDmgGiven = function _CoreCapacity_magicalStrikeDmgGiven(thrower) {
    return __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeNormalDamage).call(this, thrower.getMagicDamage());
}, _CoreCapacity_magicalCriticalStrikeDmgGiven = function _CoreCapacity_magicalCriticalStrikeDmgGiven(thrower) {
    let dmg = 0;
    if (__classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_isCriticalDamage).call(this, thrower.getMagicCriticalRate())) {
        dmg = __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeCriticalDamage).call(this, thrower.getMagicDamage(), thrower.getMagicCriticalNumber());
    }
    return dmg;
}, _CoreCapacity_physicalDefenseDmgTaken = function _CoreCapacity_physicalDefenseDmgTaken(target, dmg) {
    dmg = dmg - __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeDefense).call(this, target.getArmor());
    return dmg;
}, _CoreCapacity_magicDefenseDmgTaken = function _CoreCapacity_magicDefenseDmgTaken(target, dmg, elementalType) {
    dmg = dmg - __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeDefense).call(this, __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeElementalResitance).call(this, target, elementalType));
    return dmg;
}, _CoreCapacity_touched = function _CoreCapacity_touched(thrower, target) {
    let rate = thrower.getAccuracy() - target.getEscape();
    return __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeRand1on2).call(this, rate) ? true : false;
}, _CoreCapacity_multiplicator = function _CoreCapacity_multiplicator(value, percentage) {
    return Math.floor(value * percentage / 100);
}, _CoreCapacity_computeNormalDamage = function _CoreCapacity_computeNormalDamage(damage) {
    return damage;
}, _CoreCapacity_isCriticalDamage = function _CoreCapacity_isCriticalDamage(rate) { return __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_computeRand1on2).call(this, rate) > 100 ? true : false; }, _CoreCapacity_computeCriticalDamage = function _CoreCapacity_computeCriticalDamage(normal, critical) { return normal + critical; }, _CoreCapacity_computeDefense = function _CoreCapacity_computeDefense(defense) { return defense; }, _CoreCapacity_computeElementalResitance = function _CoreCapacity_computeElementalResitance(target, elementalType) {
    switch (elementalType) {
        case (Element.FIRE()):
            return target.getFireResistance();
        case (Element.WATER()):
            return target.getWaterResistance();
        case (Element.PLANT()):
            return target.getPlantResistance();
        case (Element.NECROMANCY()):
            return target.getNecromancyResistance();
        case (Element.BLESSING()):
            return target.getBlessingResistance();
        default:
            return 0;
    }
}, _CoreCapacity_computeRand1on2 = function _CoreCapacity_computeRand1on2(rate) {
    return rate + 50 + __classPrivateFieldGet(this, _CoreCapacity_instances, "m", _CoreCapacity_rand1To100).call(this);
}, _CoreCapacity_rand1To100 = function _CoreCapacity_rand1To100() {
    return Math.floor(Math.random() * 100) + 1;
};
export default CoreCapacity;
//# sourceMappingURL=CoreCapacity.js.map