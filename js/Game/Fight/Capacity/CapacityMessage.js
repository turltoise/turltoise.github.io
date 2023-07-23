var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CapacityMessage_addMessage, _CapacityMessage_fontForStackPlayCard, _CapacityMessage_fontForSkillCombat, _CapacityMessage_classForStackPlayCard, _CapacityMessage_fontWithClass;
import Chat from "../../Chat/Chat.js";
import F from "../../Tools/F.js";
class CapacityMessage {
    static failed(container, attackName) {
        let text = F.sprintf('%s failed.', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName));
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.SECONDARY_CLASS());
    }
    static putStatus(container, attackName, target) {
        let text = F.sprintf('%s put on %s', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName), __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target));
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.SECONDARY_CLASS());
    }
    static capacityWithFocus(container, attackName, thrower, target) {
        let text = F.sprintf('%s use %s on %s.', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, thrower), __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName), __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target));
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.PRIMARY_CLASS());
    }
    static heal(container, target, heal) {
        let text = F.sprintf('%s received %s of heal.', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target), heal);
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.SECONDARY_CLASS());
    }
    static shield(container, target, shield) {
        let text = F.sprintf('%s received %s of shield.', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForStackPlayCard).call(CapacityMessage, target), shield);
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.SECONDARY_CLASS());
    }
    static damage(container, attackName, dmgTaken, criticalBonus, element) {
        let text = F.sprintf('%s gave %s damage %s.', __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontForSkillCombat).call(CapacityMessage, attackName), dmgTaken, element !== null && element !== void 0 ? element : '');
        if (criticalBonus > 0) {
            text += F.sprintf(' (Critical bonus: %s)', criticalBonus);
        }
        __classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_addMessage).call(CapacityMessage, container, text, CapacityMessage.SECONDARY_CLASS());
    }
    static PRIMARY_CLASS() { return 'message-combat-primary'; }
    static SECONDARY_CLASS() { return 'message-combat-secondary'; }
    static HERO_CLASS() { return 'message-hero-target'; }
    static ENEMY_CLASS() { return 'message-enemy-target'; }
    static SKILL_COMBAT_CLASS() { return 'message-combat-skill'; }
}
_a = CapacityMessage, _CapacityMessage_addMessage = function _CapacityMessage_addMessage(container, text, className) {
    const chat = container.get(Chat.name);
    chat.addChatMessage(__classPrivateFieldGet(CapacityMessage, _a, "m", _CapacityMessage_fontWithClass).call(CapacityMessage, text, className), null);
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