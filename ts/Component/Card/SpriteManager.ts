import Container from "../../Container.js";
import AbstractPrintableCard from "../../Game/Card/AbstractPrintableCard.js";

class SpriteManager {
    private _container: Container;
 
    constructor(container: Container) {
        this._container = container;
    }

    compute(card: AbstractPrintableCard) {
        switch(card.getCombatSpriteText()) {
            case SpriteManager.IMG_DIE1():
                this.#computeDie1(card);
                break;
            case SpriteManager.IMG_STAND():
                this.#computeStand(card);
                break;
            case SpriteManager.IMG_HIT1():
                this.#computeHit1(card);
                break;
            case SpriteManager.IMG_ATTACK1():
                this.#computeAttack1(card);
                break;
            default:
                console.warn(card.getCombatSpriteText() + " not in the list of cinematic text.");
        }
    }

    #hasNextIndex(card: AbstractPrintableCard, maxSprite: string = "_maxSpriteDie1")  {
        if (card.getCombatSpriteIndex() + 1 >= card.getCardGraphicSetting()[maxSprite]) {
            return false;
        } else {
            return true; 
        }
    }

    #hasAnimation(card: AbstractPrintableCard, maxSprite: string = "_maxSpriteDie1") {
        if (card.getCardGraphicSetting()[maxSprite] == -1) {
            return false;
        } else {
            return true; 
        }
    }

    #setDefaultAnimation(card: AbstractPrintableCard)  {
        card.setCombatSpriteText(SpriteManager.IMG_STAND());
        card.resetCombatSpriteIndex();
        card.resetCombatSpriteTimeCounter();
    }

    #computeDie1(card: AbstractPrintableCard) {
        // animation stop on last die
        if (this.#hasAnimation(card, "_maxSpriteDie1")) {
            if (this.#hasNextIndex(card, "_maxSpriteDie1")) {
                card.incrementCombatSpriteIndex();
            }
        } else {
            this.#setDefaultAnimation(card);
        }
    }

    #computeHit1(card: AbstractPrintableCard) {
        // animation stay few times and go back on default
        if (this.#hasAnimation(card, "_maxSpriteHit1")) {
            if (this.#hasNextIndex(card, "_maxSpriteHit1")) {
                card.incrementCombatSpriteIndex();
            } else {
                if (card.getCombatSpriteTimeCounter() <= 4 ) {
                    card.incrementCombatSpriteTimeCounter();
                } else {
                    this.#setDefaultAnimation(card);
                }
            }
        } else {
            this.#setDefaultAnimation(card);
        }
    }

    #computeStand(card: AbstractPrintableCard) {
        // animation loop and go back on default (stand the same)
        if (this.#hasAnimation(card, "_maxSpriteStand")) {
            if (this.#hasNextIndex(card, "_maxSpriteStand")) {
                card.incrementCombatSpriteIndex();
            } else {
                this.#setDefaultAnimation(card);
            }
        } else {
            this.#setDefaultAnimation(card);
        }
    }

    #computeAttack1(card: AbstractPrintableCard) {
        // animation loop and go back on default
        if (this.#hasAnimation(card, "_maxSpriteAttack1")) {
            if (this.#hasNextIndex(card, "_maxSpriteAttack1")) {
                card.incrementCombatSpriteIndex();
            } else {
                this.#setDefaultAnimation(card);
            }
        } else {
            this.#setDefaultAnimation(card);
        }
    }

    static IMG_DIE1(): string {return "die1";}
    static IMG_HIT1(): string {return "hit1";}
    static IMG_MOVE(): string {return "move";}
    static IMG_STAND(): string {return "stand";}
    static IMG_JUMP(): string {return "jump";}

    static IMG_ATTACK1(): string {return "attack1";}
}
export default SpriteManager