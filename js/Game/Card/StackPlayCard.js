var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StackPlayCard_instances, _StackPlayCard_getRandomCapacity, _StackPlayCard_computeStat, _StackPlayCard_aggregatedStatOfAllSoloCardLinkToThisAggregateCard, _StackPlayCard_checkBuffForCarac;
import SpriteManager from '../../Component/Card/SpriteManager.js';
import PhysicalAttack from '../Fight/Capacity/List/PhysicalAttack.js';
import UUID from '../Tools/UUID.js';
import AbstractPrintableCard from './AbstractPrintableCard.js';
import CardAnimation from './CardAnimation.js';
import Hero from './Hero.js';
class StackPlayCard extends AbstractPrintableCard {
    constructor(container, playCardMap, cardGraphicSetting) {
        super(container, playCardMap.get(StackPlayCard.MAIN_KEY()).getTitle(), playCardMap.get(StackPlayCard.MAIN_KEY()).getImg(), playCardMap.get(StackPlayCard.MAIN_KEY()).getUUID(), cardGraphicSetting);
        _StackPlayCard_instances.add(this);
        this._sMap = playCardMap;
        this._statusList = new Map();
        this._currentLife = this.getLife();
        this._currentShield = 0;
    }
    addCurrentLife(addLife) {
        this._currentLife += addLife;
        this._currentLife = (this._currentLife > this.getLife()) ? this.getLife() : this._currentLife;
    }
    removeCurrentLife(removeLife) {
        this._currentLife -= removeLife;
        this._currentLife = (this._currentLife < 0) ? 0 : this._currentLife;
    }
    getCurrentLife() { return this._currentLife; }
    getMaxLife() { return this.getLife(); }
    getMainPlayCard() { return this._sMap.get(StackPlayCard.MAIN_KEY()); }
    isYours() {
        return (this.getMainPlayCard().getCollectionCard() instanceof Hero) ? true : false;
    }
    isAlive() {
        return (this._currentLife > 0) ? true : false;
    }
    heal(heal) {
        this.addCurrentLife(heal);
        this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '+ ' + heal.toString(), '#43a047'));
    }
    shield(shield) {
        this._currentShield += shield;
        this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '+ ' + shield.toString(), '#2196f3'));
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
        this.removeCurrentLife(dmg);
        this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '- ' + dmg.toString(), '#b71c1c'));
        if (this._currentLife <= 0) {
            this.setCombatSpriteText(SpriteManager.IMG_DIE1());
        }
        else {
            this.setCombatSpriteText(SpriteManager.IMG_HIT1());
        }
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
    playCapacity(container, target) {
        let capacity = __classPrivateFieldGet(this, _StackPlayCard_instances, "m", _StackPlayCard_getRandomCapacity).call(this, container);
        capacity.trigger(this, target);
        this.addFightAnimation(new CardAnimation(CardAnimation.ATTACK()));
        this.setCombatSpriteText(SpriteManager.IMG_ATTACK1());
    }
    static MAIN_KEY() { return 'this'; }
}
_StackPlayCard_instances = new WeakSet(), _StackPlayCard_getRandomCapacity = function _StackPlayCard_getRandomCapacity(container) {
    let capacities = new Map();
    this._sMap.forEach((computedCard) => {
        capacities = new Map([...capacities, ...computedCard.getCapacities()]);
        ;
    });
    let keys = Array.from(capacities.keys());
    let capacity = capacities.get(keys[Math.floor(Math.random() * keys.length)]);
    if (!capacity) {
        capacity = new PhysicalAttack(container);
    }
    return capacity;
}, _StackPlayCard_computeStat = function _StackPlayCard_computeStat(methodName) {
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