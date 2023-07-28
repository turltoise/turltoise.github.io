var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SpriteManager_instances, _SpriteManager_hasNextIndex, _SpriteManager_hasAnimation, _SpriteManager_setDefaultAnimation, _SpriteManager_computeDie1, _SpriteManager_computeHit1, _SpriteManager_computeStand, _SpriteManager_computeAttack1;
class SpriteManager {
    constructor(container) {
        _SpriteManager_instances.add(this);
        this._container = container;
    }
    compute(card) {
        switch (card.getCombatSpriteText()) {
            case SpriteManager.IMG_DIE1():
                __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_computeDie1).call(this, card);
                break;
            case SpriteManager.IMG_STAND():
                __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_computeStand).call(this, card);
                break;
            case SpriteManager.IMG_HIT1():
                __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_computeHit1).call(this, card);
                break;
            case SpriteManager.IMG_ATTACK1():
                __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_computeAttack1).call(this, card);
                break;
            default:
                console.warn(card.getCombatSpriteText() + " not in the list of cinematic text.");
        }
    }
    static IMG_DIE1() { return "die1"; }
    static IMG_HIT1() { return "hit1"; }
    static IMG_MOVE() { return "move"; }
    static IMG_STAND() { return "stand"; }
    static IMG_JUMP() { return "jump"; }
    static IMG_ATTACK1() { return "attack1"; }
}
_SpriteManager_instances = new WeakSet(), _SpriteManager_hasNextIndex = function _SpriteManager_hasNextIndex(card, maxSprite = "_maxSpriteDie1") {
    if (card.getCombatSpriteIndex() + 1 >= card.getCardGraphicSetting()[maxSprite]) {
        return false;
    }
    else {
        return true;
    }
}, _SpriteManager_hasAnimation = function _SpriteManager_hasAnimation(card, maxSprite = "_maxSpriteDie1") {
    if (card.getCardGraphicSetting()[maxSprite] == -1) {
        return false;
    }
    else {
        return true;
    }
}, _SpriteManager_setDefaultAnimation = function _SpriteManager_setDefaultAnimation(card) {
    card.setCombatSpriteText(SpriteManager.IMG_STAND());
    card.resetCombatSpriteIndex();
    card.resetCombatSpriteTimeCounter();
}, _SpriteManager_computeDie1 = function _SpriteManager_computeDie1(card) {
    // animation stop on last die
    if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasAnimation).call(this, card, "_maxSpriteDie1")) {
        if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasNextIndex).call(this, card, "_maxSpriteDie1")) {
            card.incrementCombatSpriteIndex();
        }
    }
    else {
        __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
    }
}, _SpriteManager_computeHit1 = function _SpriteManager_computeHit1(card) {
    // animation stay few times and go back on default
    if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasAnimation).call(this, card, "_maxSpriteHit1")) {
        if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasNextIndex).call(this, card, "_maxSpriteHit1")) {
            card.incrementCombatSpriteIndex();
        }
        else {
            if (card.getCombatSpriteTimeCounter() <= 4) {
                card.incrementCombatSpriteTimeCounter();
            }
            else {
                __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
            }
        }
    }
    else {
        __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
    }
}, _SpriteManager_computeStand = function _SpriteManager_computeStand(card) {
    // animation loop and go back on default (stand the same)
    if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasAnimation).call(this, card, "_maxSpriteStand")) {
        if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasNextIndex).call(this, card, "_maxSpriteStand")) {
            card.incrementCombatSpriteIndex();
        }
        else {
            __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
        }
    }
    else {
        __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
    }
}, _SpriteManager_computeAttack1 = function _SpriteManager_computeAttack1(card) {
    // animation loop and go back on default
    if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasAnimation).call(this, card, "_maxSpriteAttack1")) {
        if (__classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_hasNextIndex).call(this, card, "_maxSpriteAttack1")) {
            card.incrementCombatSpriteIndex();
        }
        else {
            __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
        }
    }
    else {
        __classPrivateFieldGet(this, _SpriteManager_instances, "m", _SpriteManager_setDefaultAnimation).call(this, card);
    }
};
export default SpriteManager;
//# sourceMappingURL=SpriteManager.js.map