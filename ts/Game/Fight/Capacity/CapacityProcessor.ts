import StackPlayCard from "../../Card/StackPlayCard.js";
import State from "../../State/State.js";
import Element from "../Element.js";
import Status from "../Status/Status.js";


class CapacityProcessor {

	static putStatus(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, status: Status) {
		if (CapacityProcessor.#touched(thrower, target)) {
			target.addStatus(status);
			state.addChatMessage(attackName + " put on " + target.getTitle());
		} else {
			state.addChatMessage(attackName + " failed.");
		}
	}

	static annoucementCapacityWithFocus(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
		state.addChatMessage(
			thrower.getTitle() + " use " + attackName + " on " + target.getTitle() + "."
		);
	}

	static heal(state: State, thrower: StackPlayCard, target: StackPlayCard, power: number, heal?: number) {
		if (heal === null) {
			heal = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		}
		heal = CapacityProcessor.#multiplicator(heal, power);
		target.heal(heal);
		state.addChatMessage(target.getTitle()+" received " + heal + " of heal.");
	}

	static shield(state: State, thrower: StackPlayCard, target: StackPlayCard, power: number, shield?: number) {
		if (shield === null) {
			shield = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		}
		shield = CapacityProcessor.#multiplicator(shield, power);
		target.shield(shield);
		state.addChatMessage(target.getTitle()+" received " + shield + " of shield.");
	}

	static magicProc(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string) {
		let dmgTaken = 0;

		let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
		dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
		dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
		target.dmg(dmgTaken);
		state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
	
		return dmgTaken;
	}

	static magicAttack(state: State, attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string) {
		let dmgTaken = 0;
		if (CapacityProcessor.#touched(thrower, target)) {
			let dmgGiven = CapacityProcessor.#magicalStrikeDmgGiven(thrower);
			dmgTaken = CapacityProcessor.#magicDefenseDmgTaken(target, dmgGiven, element);
			dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
		} else {
			state.addChatMessage(attackName + " missed target.");
		}
		return dmgTaken;
	}

	static physicalAttack(state: State, attackName: string, thrower: StackPlayCard, target:StackPlayCard, power:number) {
		let dmgTaken = 0;
		if (CapacityProcessor.#touched(thrower, target)) {
			let dmgGiven = CapacityProcessor.physicalStrikeDmgGiven(state, thrower);
			dmgTaken = CapacityProcessor.#physicalDefenseDmgTaken(target, dmgGiven);
			dmgTaken = CapacityProcessor.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			state.addChatMessage(attackName + " gave " + dmgTaken +" damage.");
		} else {
			state.addChatMessage(attackName + " missed target.");
		}
		return dmgTaken;
	}


	static physicalStrikeDmgGiven(state: State, thrower: StackPlayCard) {
		let dmg = CapacityProcessor.#computeNormalDamage(thrower.getPhysicalDamage());
		if (CapacityProcessor.#isCriticalDamage(thrower.getPhysicalCriticalRate())) {
			dmg = CapacityProcessor.#computeCriticalDamage(thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber()
			);
		}
		return dmg;
	}

	static #magicalStrikeDmgGiven(thrower: StackPlayCard) {
		let dmg = CapacityProcessor.#computeNormalDamage(thrower.getMagicDamage());
		if (CapacityProcessor.#isCriticalDamage(thrower.getMagicCriticalRate())) {
			dmg = CapacityProcessor.#computeCriticalDamage(thrower.getMagicDamage(), thrower.getMagicCriticalNumber()
			);
		}
		return dmg;
	}

	static #physicalDefenseDmgTaken(target: StackPlayCard, dmg: number) {
		dmg = dmg - CapacityProcessor.#computeDefense(target.getArmor());
		return dmg;
	}

	static #magicDefenseDmgTaken(target: StackPlayCard, dmg: number, elementalType) {
		dmg = dmg - CapacityProcessor.#computeDefense(CapacityProcessor.#computeElementalResitance(target, elementalType));
		return dmg;
	}

	static #touched(thrower, target) {
		let rate = thrower.getAccuracy() - target.getEscape();
		return this.#computeRand1on2(rate) ? true : false;
	}

	static #multiplicator(value: number, percentage: number): number{
		return Math.floor(value * percentage / 100);
	}

	static #computeNormalDamage(damage: number): number {
		return damage;
	}
	static #isCriticalDamage(rate) {return this.#computeRand1on2(rate) > 100 ? true : false;}
	static #computeCriticalDamage(normal, critical) {return normal * 2 + critical; }
	static #computeDefense(defense) {return defense;}
	static #computeElementalResitance(target, elementalType) {
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

		/*
			activate capacity :
			an active capacity has a list of event
			for each events : // deal damage, heal, apply status, ...
				- select targets for event : number and criteria selection (enemies with max def or allies with low life)
				- apply event (event trigger passif and status)
		*/
		// attack is 
		// applique status (sur toutes la listes)
		// look carac des throwers
		// look carac des targets
		// onEvent peuvent cancel ou autre (en fonction des status et des capacité passive)


		// applique damage/heal (sur toutes la listes)
		// look carac des throwers
		// look carac des targets
		// onEvent peuvent cancel ou autre (en fonction des status et des capacité passive)

		/*
		
		exemple avec vol de vie :
		vol de vie capacité passiv
		when event this.attack
		après avoir calculéé les dégats reçus par la liste des sad target




		capacité active (déclenche plusieurs events)
		capacité passive (on event déclenche quelque chose)
		onEvent apply effect

		*/