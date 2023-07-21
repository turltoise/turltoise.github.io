import StackPlayCard from "../../Card/StackPlayCard";
import State from "../../State/State";

class CapacityMessage {

    static failed(state: State, attackName: string): void {
        let text = CapacityMessage.#fontForSkillCombat(attackName) + " failed.";
        CapacityMessage.#addMessage(state, text, CapacityMessage.SECONDARY_CLASS());
    }

    static putStatus(state: State, attackName: string, target: StackPlayCard): void {
        let text = CapacityMessage.#fontForSkillCombat(attackName) + " put on " + CapacityMessage.#fontForStackPlayCard(target);
        CapacityMessage.#addMessage(state, text, CapacityMessage.SECONDARY_CLASS());
    }

    static capacityWithFocus(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
        let text = CapacityMessage.#fontForStackPlayCard(thrower) + " use " + CapacityMessage.#fontForSkillCombat(attackName) + " on " + CapacityMessage.#fontForStackPlayCard(target) + ".";
        CapacityMessage.#addMessage(state, text, CapacityMessage.PRIMARY_CLASS());
    }

    static heal(state: State, target: StackPlayCard, heal: number) {
        let text = CapacityMessage.#fontForStackPlayCard(target) + " received " + heal + " of heal.";
        CapacityMessage.#addMessage(state, text, CapacityMessage.SECONDARY_CLASS());
    }

    static shield(state: State, target: StackPlayCard, shield: number) {
        let text = CapacityMessage.#fontForStackPlayCard(target) + " received " + shield + " of shield.";
        CapacityMessage.#addMessage(state, text, CapacityMessage.SECONDARY_CLASS());
    }

    static damage(state: State, attackName: string, dmgTaken: number) {
        let text = CapacityMessage.#fontForSkillCombat(attackName) + " gave " + dmgTaken + " damage.";
        CapacityMessage.#addMessage(state, text, CapacityMessage.SECONDARY_CLASS());
    }

    static #addMessage(state: State, text: string, className: string): void {
        state.addChatMessage(CapacityMessage.#fontWithClass(text, className));
    }

    static #fontForStackPlayCard(stackPlayCard: StackPlayCard): string {
        return CapacityMessage.#fontWithClass(stackPlayCard.getTitle(), CapacityMessage.#classForStackPlayCard(stackPlayCard));
    }

    static #fontForSkillCombat(attackName: string): string {
        return CapacityMessage.#fontWithClass(attackName, CapacityMessage.SKILL_COMBAT_CLASS());
    }

    static #classForStackPlayCard(stackPlayCard: StackPlayCard) {
        return (stackPlayCard.isYours()) ? CapacityMessage.HERO_CLASS() : CapacityMessage.ENEMY_CLASS();
    }

    static #fontWithClass(text : string, className: string): string {
        return '<font class=' + className + '>'+ text +'</font>';
    }

    static PRIMARY_CLASS(): string   {return 'message-combat-primary';}
    static SECONDARY_CLASS(): string {return 'message-combat-secondary';}

    static HERO_CLASS(): string {return 'message-hero-target';}
    static ENEMY_CLASS(): string {return 'message-enemy-target';}
    
    static SKILL_COMBAT_CLASS(): string {return 'message-combat-skill';}
    
}
export default CapacityMessage; 