var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CapacityMessage_addMessage, _CapacityMessage_fontForStackPlayCard, _CapacityMessage_fontForSkillCombat, _CapacityMessage_classForStackPlayCard, _CapacityMessage_fontWithClass;
class CapacityMessage {
    static failed(state, attackName) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName) + " failed.";
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.SECONDARY_CLASS());
    }
    static putStatus(state, attackName, target) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName) + " put on " + __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target);
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.SECONDARY_CLASS());
    }
    static capacityWithFocus(state, attackName, thrower, target) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, thrower) + " use " + __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName) + " on " + __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target) + ".";
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.PRIMARY_CLASS());
    }
    static heal(state, target, heal) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target) + " received " + heal + " of heal.";
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.SECONDARY_CLASS());
    }
    static shield(state, target, shield) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target) + " received " + shield + " of shield.";
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.SECONDARY_CLASS());
    }
    static damage(state, attackName, dmgTaken) {
        let text = __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName) + " gave " + dmgTaken + " damage.";
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, state, text, CapacityMessage.SECONDARY_CLASS());
    }
    static PRIMARY_CLASS() { return 'message-combat-primary'; }
    static SECONDARY_CLASS() { return 'message-combat-secondary'; }
    static HERO_CLASS() { return 'message-hero-target'; }
    static ENEMY_CLASS() { return 'message-enemy-target'; }
    static SKILL_COMBAT_CLASS() { return 'message-combat-skill'; }
}
_a = CapacityMessage, _CapacityMessage_addMessage = function _CapacityMessage_addMessage(state, text, className) {
    state.addChatMessage(__classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontWithClass).call(CapacityMessage, text, className));
}, _CapacityMessage_fontForStackPlayCard = function _CapacityMessage_fontForStackPlayCard(stackPlayCard) {
    return __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontWithClass).call(CapacityMessage, stackPlayCard.getTitle(), __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_classForStackPlayCard).call(CapacityMessage, stackPlayCard));
}, _CapacityMessage_fontForSkillCombat = function _CapacityMessage_fontForSkillCombat(attackName) {
    return __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontWithClass).call(CapacityMessage, attackName, CapacityMessage.SKILL_COMBAT_CLASS());
}, _CapacityMessage_classForStackPlayCard = function _CapacityMessage_classForStackPlayCard(stackPlayCard) {
    return (stackPlayCard.isYours()) ? CapacityMessage.HERO_CLASS() : CapacityMessage.ENEMY_CLASS();
}, _CapacityMessage_fontWithClass = function _CapacityMessage_fontWithClass(text, className) {
    return '<font class=' + className + '>' + text + '</font>';
};
export default CapacityMessage;
//# sourceMappingURL=CapacityMessage.js.map