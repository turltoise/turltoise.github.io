var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CapacityProcessor_magicalStrikeDmgGiven, _CapacityProcessor_physicalDefenseDmgTaken, _CapacityProcessor_magicDefenseDmgTaken, _CapacityProcessor_touched, _CapacityProcessor_multiplicator, _CapacityProcessor_computeNormalDamage, _CapacityProcessor_isCriticalDamage, _CapacityProcessor_computeCriticalDamage, _CapacityProcessor_computeDefense, _CapacityProcessor_computeElementalResitance, _CapacityProcessor_computeRand1on2, _CapacityProcessor_rand1To100;
import Element from "../Element.js";
import CapacityMessage from "./CapacityMessage.js";
class CapacityProcessor {
    static putStatus(state, attackName, thrower, target, status) {
        if (__classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_touched).call(CapacityProcessor, thrower, target)) {
            target.addStatus(status);
            CapacityMessage.putStatus(state, attackName, target);
        }
        else {
            CapacityMessage.failed(state, attackName);
        }
    }
    static annoucementCapacityWithFocus(state, attackName, thrower, target) {
        CapacityMessage.capacityWithFocus(state, attackName, thrower, target);
    }
    static heal(state, thrower, target, power, heal) {
        if (heal === null) {
            heal = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicalStrikeDmgGiven).call(CapacityProcessor, thrower);
        }
        heal = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_multiplicator).call(CapacityProcessor, heal, power);
        target.heal(heal);
        CapacityMessage.heal(state, target, heal);
        return heal;
    }
    static shield(state, thrower, target, power, shield) {
        if (shield === null) {
            shield = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicalStrikeDmgGiven).call(CapacityProcessor, thrower);
        }
        shield = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_multiplicator).call(CapacityProcessor, shield, power);
        target.shield(shield);
        CapacityMessage.shield(state, target, shield);
        return shield;
    }
    static magicProc(state, attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        let dmgGiven = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicalStrikeDmgGiven).call(CapacityProcessor, thrower);
        dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicDefenseDmgTaken).call(CapacityProcessor, target, dmgGiven, element);
        dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_multiplicator).call(CapacityProcessor, dmgTaken, power);
        target.dmg(dmgTaken);
        CapacityMessage.damage(state, attackName, dmgTaken);
        return dmgTaken;
    }
    static magicAttack(state, attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_touched).call(CapacityProcessor, thrower, target)) {
            let dmgGiven = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicalStrikeDmgGiven).call(CapacityProcessor, thrower);
            dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_magicDefenseDmgTaken).call(CapacityProcessor, target, dmgGiven, element);
            dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_multiplicator).call(CapacityProcessor, dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(state, attackName, dmgTaken);
        }
        else {
            CapacityMessage.failed(state, attackName);
        }
        return dmgTaken;
    }
    static physicalAttack(state, attackName, thrower, target, power) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_touched).call(CapacityProcessor, thrower, target)) {
            let dmgGiven = CapacityProcessor.physicalStrikeDmgGiven(state, thrower);
            dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_physicalDefenseDmgTaken).call(CapacityProcessor, target, dmgGiven);
            dmgTaken = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_multiplicator).call(CapacityProcessor, dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(state, attackName, dmgTaken);
        }
        else {
            CapacityMessage.failed(state, attackName);
        }
        return dmgTaken;
    }
    static physicalStrikeDmgGiven(state, thrower) {
        let dmg = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeNormalDamage).call(CapacityProcessor, thrower.getPhysicalDamage());
        if (__classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_isCriticalDamage).call(CapacityProcessor, thrower.getPhysicalCriticalRate())) {
            dmg = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeCriticalDamage).call(CapacityProcessor, thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber());
        }
        return dmg;
    }
}
_a = CapacityProcessor, _CapacityProcessor_magicalStrikeDmgGiven = function _CapacityProcessor_magicalStrikeDmgGiven(thrower) {
    let dmg = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeNormalDamage).call(CapacityProcessor, thrower.getMagicDamage());
    if (__classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_isCriticalDamage).call(CapacityProcessor, thrower.getMagicCriticalRate())) {
        dmg = __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeCriticalDamage).call(CapacityProcessor, thrower.getMagicDamage(), thrower.getMagicCriticalNumber());
    }
    return dmg;
}, _CapacityProcessor_physicalDefenseDmgTaken = function _CapacityProcessor_physicalDefenseDmgTaken(target, dmg) {
    dmg = dmg - __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeDefense).call(CapacityProcessor, target.getArmor());
    return dmg;
}, _CapacityProcessor_magicDefenseDmgTaken = function _CapacityProcessor_magicDefenseDmgTaken(target, dmg, elementalType) {
    dmg = dmg - __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeDefense).call(CapacityProcessor, __classPrivateFieldGet(CapacityProcessor, _a, "m", _CapacityProcessor_computeElementalResitance).call(CapacityProcessor, target, elementalType));
    return dmg;
}, _CapacityProcessor_touched = function _CapacityProcessor_touched(thrower, target) {
    let rate = thrower.getAccuracy() - target.getEscape();
    return __classPrivateFieldGet(this, _a, "m", _CapacityProcessor_computeRand1on2).call(this, rate) ? true : false;
}, _CapacityProcessor_multiplicator = function _CapacityProcessor_multiplicator(value, percentage) {
    return Math.floor(value * percentage / 100);
}, _CapacityProcessor_computeNormalDamage = function _CapacityProcessor_computeNormalDamage(damage) {
    return damage;
}, _CapacityProcessor_isCriticalDamage = function _CapacityProcessor_isCriticalDamage(rate) { return __classPrivateFieldGet(this, _a, "m", _CapacityProcessor_computeRand1on2).call(this, rate) > 100 ? true : false; }, _CapacityProcessor_computeCriticalDamage = function _CapacityProcessor_computeCriticalDamage(normal, critical) { return normal * 2 + critical; }, _CapacityProcessor_computeDefense = function _CapacityProcessor_computeDefense(defense) { return defense; }, _CapacityProcessor_computeElementalResitance = function _CapacityProcessor_computeElementalResitance(target, elementalType) {
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
}, _CapacityProcessor_computeRand1on2 = function _CapacityProcessor_computeRand1on2(rate) {
    return rate + 50 + __classPrivateFieldGet(this, _a, "m", _CapacityProcessor_rand1To100).call(this);
}, _CapacityProcessor_rand1To100 = function _CapacityProcessor_rand1To100() {
    return Math.floor(Math.random() * 100) + 1;
};
export default CapacityProcessor;
//# sourceMappingURL=CapacityProcessor.js.map