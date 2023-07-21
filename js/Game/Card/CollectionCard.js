var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CollectionCard_instances, _CollectionCard_computeMainStat, _CollectionCard_computeSecondaryStat, _CollectionCard_computeLifeStat;
import UUID from "../Tools/UUID.js";
import PlayCard from "./PlayCard.js";
import AbstractPrintableCard from "./AbstractPrintableCard.js";
/**
 * Use in collection and shop : to display raw carac of leveled card
 */
class CollectionCard extends AbstractPrintableCard {
    constructor(rawCarac, level, title, img, capacities = new Map(), uuid = UUID.generateUUID()) {
        super(title, img, uuid);
        _CollectionCard_instances.add(this);
        this._rawCarac = rawCarac;
        this._level = level;
        this._capacities = capacities;
    }
    getPlayCard() { return new PlayCard(this); }
    getStackPlayCard() { return null; }
    getLevel() { return this._level; }
    getCapacities() { return this._capacities; }
    addCapacity(capacity) { this._capacities.set(UUID.generateUUID(), capacity); }
    getCapacityByUUID(uuid) { return this._capacities.get(uuid); }
    getRandomCapacity(state) {
        let keys = Array.from(this._capacities.keys());
        return this._capacities.get(keys[Math.floor(Math.random() * keys.length)]);
    }
    getStrength() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeMainStat).call(this, this._rawCarac._rawStrength); }
    getDexterity() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeMainStat).call(this, this._rawCarac._rawDexterity); }
    getIntelligence() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeMainStat).call(this, this._rawCarac._rawIntelligence); }
    getLuck() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeMainStat).call(this, this._rawCarac._rawLuck); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalDamage); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalCriticalRate); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalCriticalNumber); }
    getMagicDamage() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawMagicDamage); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawMagicCriticalRate); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawMagicCriticalNumber); }
    getFireResistance() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawFireResistance); }
    getWaterResistance() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawWaterResistance); }
    getPlantResistance() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawPlantResistance); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawNecromancyResistance); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawBlessingResistance); }
    getArmor() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawArmor); }
    getAccuracy() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawAccuracy); }
    getEscape() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeSecondaryStat).call(this, this._rawCarac._rawEscape); }
    getLife() { return __classPrivateFieldGet(this, _CollectionCard_instances, "m", _CollectionCard_computeLifeStat).call(this, this._rawCarac._rawLife); }
}
_CollectionCard_instances = new WeakSet(), _CollectionCard_computeMainStat = function _CollectionCard_computeMainStat(raw) {
    return raw + Math.floor(this._level * raw / 2);
}, _CollectionCard_computeSecondaryStat = function _CollectionCard_computeSecondaryStat(raw) {
    return raw + Math.floor(this._level * raw / 6);
}, _CollectionCard_computeLifeStat = function _CollectionCard_computeLifeStat(raw) {
    return raw + Math.floor(this._level * raw * 4 / 10);
};
export default CollectionCard;
/**
    hit(card, state) {
        state.addChatMessage(this._title + " hits " + card._title + " for " + this._currentStrength + ".", ChatMessage.SWORD());
        console.debug(card._currentLife + "/" + card._life);
        card._currentLife = parseInt(card._currentLife) - parseInt(this._currentStrength);
        console.debug(card._currentLife + "/" + card._life);

        this._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.ATTACK()));

        card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DAMAGE(), "-"+this._currentStrength));
        if (card._currentLife <= 0) {
            state.addChatMessage(card._title + " dies!", ChatMessage.DIES());
            card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DIE()));
            if (card._type == Card.ENEMY_TYPE()) {
                state._resource._gold = state._resource._gold + card._gold;
                state.addChatMessage(card._gold + " gold earned.", ChatMessage.GOLD());
            }
        }
    }
**/ 
//# sourceMappingURL=CollectionCard.js.map