var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CardAnimation_instances, _CardAnimation_isTypeExists;
class CardAnimation {
    constructor(type, data1, data2, data3) {
        _CardAnimation_instances.add(this);
        __classPrivateFieldGet(this, _CardAnimation_instances, "m", _CardAnimation_isTypeExists).call(this, type);
        this._type = type;
        this._data1 = data1;
        this._data2 = data2;
        this._data3 = data3;
    }
    isAttacking() { return (this._type == CardAnimation.ATTACK()); }
    isTakingDamage() { return (this._type == CardAnimation.DAMAGE()); }
    isDying() { return (this._type == CardAnimation.DIE()); }
    static ATTACK() { return "attack"; }
    static DIE() { return "die"; }
    static DAMAGE() { return "damage"; }
}
_CardAnimation_instances = new WeakSet(), _CardAnimation_isTypeExists = function _CardAnimation_isTypeExists(type) {
    const exists = ([
        CardAnimation.ATTACK(),
        CardAnimation.DIE(),
        CardAnimation.DAMAGE()
    ].includes(type)) ? true : false;
    (exists) ? "" : console.warn("Type " + type + " doesn't exist");
    return exists;
};
export default CardAnimation;
//# sourceMappingURL=CardAnimation.js.map