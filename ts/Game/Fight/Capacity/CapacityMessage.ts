import Container from "../../../Container.js";
import StackPlayCard from "../../Card/StackPlayCard.js";
import Chat from "../../Chat/Chat.js";
import F from "../../Tools/F.js";

class CapacityMessage {

    static failed(container: Container, attackName: string): void {
        let text = F.sprintf(
            '%s failed.',
            CapacityMessage.#fontForSkillCombat(attackName)
        );
        CapacityMessage.#addMessage(container, text, CapacityMessage.SECONDARY_CLASS());
    }

    static putStatus(container: Container, attackName: string, target: StackPlayCard): void {
        let text = F.sprintf(
            '%s put on %s',
            CapacityMessage.#fontForSkillCombat(attackName),
            CapacityMessage.#fontForStackPlayCard(target)
        );
        CapacityMessage.#addMessage(container, text, CapacityMessage.SECONDARY_CLASS());
    }

    static capacityWithFocus(container: Container, attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
        let text = F.sprintf(
            '%s use %s on %s.',
            CapacityMessage.#fontForStackPlayCard(thrower), 
            CapacityMessage.#fontForSkillCombat(attackName),
            CapacityMessage.#fontForStackPlayCard(target)
        );
        CapacityMessage.#addMessage(container, text, CapacityMessage.PRIMARY_CLASS());
    }

    static heal(container: Container, target: StackPlayCard, heal: number) {
        let text = F.sprintf(
            '%s received %s of heal.',
            CapacityMessage.#fontForStackPlayCard(target),
            heal
        );
        CapacityMessage.#addMessage(container, text, CapacityMessage.SECONDARY_CLASS());
    }

    static shield(container: Container, target: StackPlayCard, shield: number) {
        let text = F.sprintf(
            '%s received %s of shield.',
            CapacityMessage.#fontForStackPlayCard(target),
            shield
        );
        CapacityMessage.#addMessage(container, text, CapacityMessage.SECONDARY_CLASS());
    }

    static damage(container: Container, attackName: string, dmgTaken: number, criticalBonus: number, element: string) {
        let text = F.sprintf(
            '%s gave %s damage %s.',
            CapacityMessage.#fontForSkillCombat(attackName),
            dmgTaken,
            element ?? ''
        );

        if (criticalBonus > 0) {
            text += F.sprintf(
                ' (Critical bonus: %s)',
                criticalBonus
            );
        }
        CapacityMessage.#addMessage(container, text, CapacityMessage.SECONDARY_CLASS());
    }

    static #addMessage(container: Container, text: string, className: string): void {
        const chat: Chat = container.get(Chat.name);
        chat.addChatMessage(CapacityMessage.#fontWithClass(text, className), null);
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