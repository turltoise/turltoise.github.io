var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RawCardLevelComputed_instances, _RawCardLevelComputed_computeMainStat, _RawCardLevelComputed_computeSecondaryStat, _RawCardLevelComputed_computeLifeStat;
import UUID from "../Tools/UUID.js";
class RawCardLevelComputed {
    constructor(rawCarac, level, title, img) {
        _RawCardLevelComputed_instances.add(this);
        this._rawCarac = rawCarac;
        this._uuid = UUID.generateUUID();
        this._level = level;
        this._title = title;
        this._img = img;
        this._animation = new Map();
    }
    getObjecForFight() { return null; }
    getUUID() { return this._uuid; }
    getTitle() { return this._title; }
    getImg() { return this._img; }
    getLevel() { return this._level; }
    getAnimationMap() { return this._animation; }
    addAnimation(animation, uuid = UUID.generateUUID()) {
        this._animation.set(uuid, animation);
    }
    resetAnimationMap() { this._animation = new Map(); }
    getStrength() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeMainStat).call(this, this._rawCarac._rawStrength); }
    getDexterity() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeMainStat).call(this, this._rawCarac._rawDexterity); }
    getIntelligence() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeMainStat).call(this, this._rawCarac._rawIntelligence); }
    getLuck() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeMainStat).call(this, this._rawCarac._rawLuck); }
    getPhysicalDamage() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalDamage); }
    getPhysicalCriticalRate() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalCriticalRate); }
    getPhysicalCriticalNumber() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawPhysicalCriticalNumber); }
    getMagicDamage() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawMagicDamage); }
    getMagicCriticalRate() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawMagicCriticalRate); }
    getMagicCriticalNumber() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawMagicCriticalNumber); }
    getFireResistance() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawFireResistance); }
    getWaterResistance() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawWaterResistance); }
    getPlantResistance() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawPlantResistance); }
    getNecromancyResistance() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawNecromancyResistance); }
    getBlessingResistance() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawBlessingResistance); }
    getArmor() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawArmor); }
    getAccuracy() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawAccuracy); }
    getEscape() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeSecondaryStat).call(this, this._rawCarac._rawEscape); }
    getLife() { return __classPrivateFieldGet(this, _RawCardLevelComputed_instances, "m", _RawCardLevelComputed_computeLifeStat).call(this, this._rawCarac._rawLife); }
}
_RawCardLevelComputed_instances = new WeakSet(), _RawCardLevelComputed_computeMainStat = function _RawCardLevelComputed_computeMainStat(raw) {
    return raw + Math.floor(this._level * raw / 2);
}, _RawCardLevelComputed_computeSecondaryStat = function _RawCardLevelComputed_computeSecondaryStat(raw) {
    return raw + Math.floor(this._level * raw / 6);
}, _RawCardLevelComputed_computeLifeStat = function _RawCardLevelComputed_computeLifeStat(raw) {
    return raw + Math.floor(this._level * raw * 4 / 10);
};
export default RawCardLevelComputed;
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
//# sourceMappingURL=RawCardLevelComputed.js.map