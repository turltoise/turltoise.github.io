import StackPlayCard from "../../Card/StackPlayCard.js";
import State from "../../State/State.js";
import Element from "../Element.js";
import Status from "../Status/Status.js";
import CapacityMessage from "./CapacityMessage.js";


class CapacityProcessor {

	static putStatus(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, status: Status) {
		if (CapacityProcessor.#touched(thrower, target)) {
			target.addStatus(status);
			CapacityMessage.putStatus(state, attackName, target);
		} else {
			CapacityMessage.failed(state, attackName);
		}
	}

	static annoucementCapacityWithFocus(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
		CapacityMessage.capacityWithFocus(state, attackName, thrower, target);
	}

	static heal(state: State, thrower: StackPlayCard, target: StackPlayCard, power: number, heal?: number):  number {
		if (heal === null) {
			heal = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		}
		heal = CapacityProcessor.#multiplicator(heal, power);
		target.heal(heal);
		CapacityMessage.heal(state, target, heal);
		return heal;
	}

	static shield(state: State, thrower: StackPlayCard, target: StackPlayCard, power: number, shield?: number):  number {
		if (shield === null) {
			shield = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		}
		shield = CapacityProcessor.#multiplicator(shield, power);
		target.shield(shield);
		CapacityMessage.shield(state, target, shield);
		return shield;
	}

	static magicProc(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
		let dmgTaken = 0;

		let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
		dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
		target.dmg(dmgTaken);
		CapacityMessage.damage(state, attackName, dmgTaken);
	
		return dmgTaken;
	}

	static magicAttack(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
		let dmgTaken = 0;
		if (CapacityProcessor.#touched(thrower, target)) {
			let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
			dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
			dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			CapacityMessage.damage(state, attackName, dmgTaken);
		} else {
			CapacityMessage.failed(state, attackName);
		}
		return dmgTaken;
	}

	static physicalAttack(state: State, attackName: string, thrower: StackPlayCard, target:StackPlayCard, power:number):  number {
		let dmgTaken = 0;
		if (CapacityProcessor.#touched(thrower, target)) {
			let dmgGiven = CapacityProcessor.physicalStrikeDmgGiven(state, thrower);
			dmgTaken = CapacityProcessor.#physicalDefenseDmgTaken(target, dmgGiven);
			dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			CapacityMessage.damage(state, attackName, dmgTaken);
		} else {
			CapacityMessage.failed(state, attackName);
		}
		return dmgTaken;
	}


	static physicalStrikeDmgGiven(state: State, thrower: StackPlayCard):  number {
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