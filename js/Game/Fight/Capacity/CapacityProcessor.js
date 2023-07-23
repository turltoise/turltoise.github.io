export {};
/*class CapacityProcessor {

    static putStatus(container: Container, attackName: string, thrower: StackPlayCard, target: StackPlayCard, status: Status) {
        if (CapacityProcessor.#touched(thrower, target)) {
            target.addStatus(status);
            CapacityMessage.putStatus(container, attackName, target);
        } else {
            CapacityMessage.failed(container, attackName);
        }
    }

    static annoucementCapacityWithFocus(container: Container, attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
        CapacityMessage.capacityWithFocus(container, attackName, thrower, target);
    }

    static heal(container: Container, thrower: StackPlayCard, target: StackPlayCard, power: number, heal?: number):  number {
        if (heal === null) {
            heal = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
        }
        heal = CapacityProcessor.#multiplicator(heal, power);
        target.heal(heal);
        CapacityMessage.heal(container, target, heal);
        return heal;
    }

    static shield(container: Container, thrower: StackPlayCard, target: StackPlayCard, power: number, shield?: number):  number {
        if (shield === null) {
            shield = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
        }
        shield = CapacityProcessor.#multiplicator(shield, power);
        target.shield(shield);
        CapacityMessage.shield(container, target, shield);
        return shield;
    }

    static magicProc(container: Container, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
        let dmgTaken = 0;

        let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
        dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
        dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
        target.dmg(dmgTaken);
        CapacityMessage.damage(container, attackName, dmgTaken);
    
        return dmgTaken;
    }

    static magicAttack(container: Container, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
        let dmgTaken = 0;
        if (CapacityProcessor.#touched(thrower, target)) {
            let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
            dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
            dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(container, attackName, dmgTaken);
        } else {
            CapacityMessage.failed(container, attackName);
        }
        return dmgTaken;
    }
// TO DO get the element, if it is criticial and all the details
    static physicalAttack(container: Container, attackName: string, thrower: StackPlayCard, target:StackPlayCard, power:number):  number {
        let dmgTaken = 0;
        if (CapacityProcessor.#touched(thrower, target)) {
            let dmgGiven = CapacityProcessor.physicalStrikeDmgGiven(container, thrower);
            dmgTaken = CapacityProcessor.#physicalDefenseDmgTaken(target, dmgGiven);
            dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
            target.dmg(dmgTaken);
            CapacityMessage.damage(container, attackName, dmgTaken);
        } else {
            CapacityMessage.failed(container, attackName);
        }
        return dmgTaken;
    }


    static physicalStrikeDmgGiven(container: Container, thrower: StackPlayCard):  number {
        let dmg = CapacityProcessor.#computeNormalDamage(thrower.getPhysicalDamage());
        if (CapacityProcessor.#isCriticalDamage(thrower.getPhysicalCriticalRate())) {
                dmg = CapacityProcessor.#computeCriticalDamage(thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber()
            );
        }
        return dmg;
    }

    static #magicalStrikeDmgGiven(thrower: StackPlayCard):  number {
        let dmg = CapacityProcessor.#computeNormalDamage(thrower.getMagicDamage());
        if (CapacityProcessor.#isCriticalDamage(thrower.getMagicCriticalRate())) {
                dmg = CapacityProcessor.#computeCriticalDamage(thrower.getMagicDamage(), thrower.getMagicCriticalNumber()
            );
        }
        return dmg;
    }

    static #physicalDefenseDmgTaken(target: StackPlayCard, dmg: number):  number {
        dmg = dmg - CapacityProcessor.#computeDefense(target.getArmor());
        return dmg;
    }

    static #magicDefenseDmgTaken(target: StackPlayCard, dmg: number, elementalType: string):  number {
        dmg = dmg - CapacityProcessor.#computeDefense(CapacityProcessor.#computeElementalResitance(target, elementalType));
        return dmg;
    }

    static #touched(thrower: StackPlayCard, target: StackPlayCard): boolean {
        let rate = thrower.getAccuracy() - target.getEscape();
        return this.#computeRand1on2(rate) ? true : false;
    }

    static #multiplicator(value: number, percentage: number): number{
        return Math.floor(value * percentage / 100);
    }

    static #computeNormalDamage(damage: number): number {
        return damage;
    }
    static #isCriticalDamage(rate: number): boolean {return this.#computeRand1on2(rate) > 100 ? true : false;}
    static #computeCriticalDamage(normal: number, critical: number): number {return normal * 2 + critical; }
    static #computeDefense(defense: number): number {return defense;}
    static #computeElementalResitance(target: StackPlayCard, elementalType: string): number {
        switch (elementalType) {
            case(Element.FIRE()):
                return target.getFireResistance();
            case(Element.WATER()):
                return target.getWaterResistance();
            case(Element.PLANT()):
                return target.getPlantResistance();
            case(Element.NECROMANCY()):
                return target.getNecromancyResistance();
            case(Element.BLESSING()):
                return target.getBlessingResistance();
            default:
                return 0;
        }
    }

    static #computeRand1on2(rate: number): number{
        return rate + 50 + this.#rand1To100();
    }

    static #rand1To100(): number{
        return Math.floor(Math.random() * 100) + 1;
    }
}
export default CapacityProcessor;
*/ 
//# sourceMappingURL=CapacityProcessor.js.map