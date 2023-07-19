var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Capacity_magicalStrikeDmgGiven, _Capacity_physicalDefenseDmgTaken, _Capacity_magicDefenseDmgTaken, _Capacity_touched, _Capacity_multiplicator, _Capacity_computeNormalDamage, _Capacity_isCriticalDamage, _Capacity_computeCriticalDamage, _Capacity_computeDefense, _Capacity_computeElementalResitance, _Capacity_computeRand1on2, _Capacity_rand1To100;
import Element from "../Element.js";
class Capacity {
    static putStatus(state, attackName, thrower, target, status) {
        if (__classPrivateFieldGet(Capacity, _a, "m", _Capacity_touched).call(Capacity, thrower, target)) {
            target.addStatus(status);
            state.addChatMessage(attackName + " put on " + target.getTitle());
        }
        else {
            state.addChatMessage(attackName + " failed.");
        }
    }
    static annoucementCapacityWithFocus(state, attackName, thrower, target) {
        state.addChatMessage(thrower.getTitle() + " use " + attackName + " on " + target.getTitle() + ".");
    }
    static heal(state, thrower, target, power, heal) {
        if (heal === null) {
            heal = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicalStrikeDmgGiven).call(Capacity, thrower);
        }
        heal = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_multiplicator).call(Capacity, heal, power);
        target.heal(heal);
        state.addChatMessage(target.getTitle() + " received " + heal + " of heal.");
    }
    static shield(state, thrower, target, power, shield) {
        if (shield === null) {
            shield = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicalStrikeDmgGiven).call(Capacity, thrower);
        }
        shield = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_multiplicator).call(Capacity, shield, power);
        target.shield(shield);
        state.addChatMessage(target.getTitle() + " received " + shield + " of shield.");
    }
    static magicProc(state, attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        let dmgGiven = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicalStrikeDmgGiven).call(Capacity, thrower);
        dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicDefenseDmgTaken).call(Capacity, target, dmgGiven, element);
        dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_multiplicator).call(Capacity, dmgTaken, power);
        target.dmg(dmgTaken);
        state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
        return dmgTaken;
    }
    static magicAttack(state, attackName, thrower, target, power, element) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(Capacity, _a, "m", _Capacity_touched).call(Capacity, thrower, target)) {
            let dmgGiven = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicalStrikeDmgGiven).call(Capacity, thrower);
            dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_magicDefenseDmgTaken).call(Capacity, target, dmgGiven, element);
            dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_multiplicator).call(Capacity, dmgTaken, power);
            target.dmg(dmgTaken);
            state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
        }
        else {
            state.addChatMessage(attackName + " missed target.");
        }
        return dmgTaken;
    }
    static physicalAttack(state, attackName, thrower, target, power) {
        let dmgTaken = 0;
        if (__classPrivateFieldGet(Capacity, _a, "m", _Capacity_touched).call(Capacity, thrower, target)) {
            let dmgGiven = Capacity.physicalStrikeDmgGiven(state, thrower);
            dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_physicalDefenseDmgTaken).call(Capacity, target, dmgGiven);
            dmgTaken = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_multiplicator).call(Capacity, dmgTaken, power);
            target.dmg(dmgTaken);
            state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
        }
        else {
            state.addChatMessage(attackName + " missed target.");
        }
        return dmgTaken;
    }
    static physicalStrikeDmgGiven(state, thrower) {
        let dmg = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeNormalDamage).call(Capacity, thrower.getPhysicalDamage());
        if (__classPrivateFieldGet(Capacity, _a, "m", _Capacity_isCriticalDamage).call(Capacity, thrower.getPhysicalCriticalRate())) {
            dmg = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeCriticalDamage).call(Capacity, thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber());
        }
        return dmg;
    }
}
_a = Capacity, _Capacity_magicalStrikeDmgGiven = function _Capacity_magicalStrikeDmgGiven(thrower) {
    let dmg = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeNormalDamage).call(Capacity, thrower.getMagicDamage());
    if (__classPrivateFieldGet(Capacity, _a, "m", _Capacity_isCriticalDamage).call(Capacity, thrower.getMagicCriticalRate())) {
        dmg = __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeCriticalDamage).call(Capacity, thrower.getMagicDamage(), thrower.getMagicCriticalNumber());
    }
    return dmg;
}, _Capacity_physicalDefenseDmgTaken = function _Capacity_physicalDefenseDmgTaken(target, dmg) {
    dmg = dmg - __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeDefense).call(Capacity, target.getArmor());
    return dmg;
}, _Capacity_magicDefenseDmgTaken = function _Capacity_magicDefenseDmgTaken(target, dmg, elementalType) {
    dmg = dmg - __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeDefense).call(Capacity, __classPrivateFieldGet(Capacity, _a, "m", _Capacity_computeElementalResitance).call(Capacity, target, elementalType));
    return dmg;
}, _Capacity_touched = function _Capacity_touched(thrower, target) {
    let rate = thrower.getAccuracy() - target.getEscape();
    return __classPrivateFieldGet(this, _a, "m", _Capacity_computeRand1on2).call(this, rate) ? true : false;
}, _Capacity_multiplicator = function _Capacity_multiplicator(value, percentage) {
    return Math.floor(value * percentage / 100);
}, _Capacity_computeNormalDamage = function _Capacity_computeNormalDamage(damage) {
    return damage;
}, _Capacity_isCriticalDamage = function _Capacity_isCriticalDamage(rate) { return __classPrivateFieldGet(this, _a, "m", _Capacity_computeRand1on2).call(this, rate) > 100 ? true : false; }, _Capacity_computeCriticalDamage = function _Capacity_computeCriticalDamage(normal, critical) { return normal * 2 + critical; }, _Capacity_computeDefense = function _Capacity_computeDefense(defense) { return defense; }, _Capacity_computeElementalResitance = function _Capacity_computeElementalResitance(target, elementalType) {
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
}, _Capacity_computeRand1on2 = function _Capacity_computeRand1on2(rate) {
    return rate + 50 + __classPrivateFieldGet(this, _a, "m", _Capacity_rand1To100).call(this);
}, _Capacity_rand1To100 = function _Capacity_rand1To100() {
    return Math.floor(Math.random() * 100) + 1;
};
export default Capacity;
/*
    activate capacity :
    an active capacity has a list of event
    for each events : // deal damage, heal, apply status, ...
        - select targets for event : number and criteria selection (enemies with max def or allies with low life)
        - apply event (event trigger passif and status)
*/
// attack is 
// applique status (sur toutes la listes)
// look carac des throwers
// look carac des targets
// onEvent peuvent cancel ou autre (en fonction des status et des capacité passive)
// applique damage/heal (sur toutes la listes)
// look carac des throwers
// look carac des targets
// onEvent peuvent cancel ou autre (en fonction des status et des capacité passive)
/*

exemple avec vol de vie :
vol de vie capacité passiv
when event this.attack
après avoir calculéé les dégats reçus par la liste des sad target




capacité active (déclenche plusieurs events)
capacité passive (on event déclenche quelque chose)
onEvent apply effect

*/ 
//# sourceMappingURL=Capacity.js.map