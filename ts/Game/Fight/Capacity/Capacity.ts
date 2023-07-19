import AggregateCardComputedForFight from "../../Card/AggregateCardComputedForFight.js";
import State from "../../State/State.js";
import Element from "../Element.js";
import Status from "../Status/Status.js";


class Capacity {

	static putStatus(state: State, attackName: string, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight, status: Status) {
		if (Capacity.#touched(thrower, target)) {
			target.addStatus(status);
			state.addChatMessage(attackName + " put on " + target.getTitle());
		} else {
			state.addChatMessage(attackName + " failed.");
		}
	}

	static annoucementCapacityWithFocus(state: State, attackName: string, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight) {
		state.addChatMessage(
			thrower.getTitle() + " use " + attackName + " on " + target.getTitle() + "."
		);
	}

	static heal(state: State, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight, power: number, heal?: number) {
		if (heal === null) {
			heal = Capacity.#magicalStrikeDmgGiven(thrower);
		}
		heal = Capacity.#multiplicator(heal, power);
		target.heal(heal);
		state.addChatMessage(target.getTitle()+" received " + heal + " of heal.");
	}

	static shield(state: State, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight, power: number, shield?: number) {
		if (shield === null) {
			shield = Capacity.#magicalStrikeDmgGiven(thrower);
		}
		shield = Capacity.#multiplicator(shield, power);
		target.shield(shield);
		state.addChatMessage(target.getTitle()+" received " + shield + " of shield.");
	}

	static magicProc(state: State, attackName: string, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight, power: number, element: string) {
		let dmgTaken = 0;

		let dmgGiven = Capacity.#magicalStrikeDmgGiven(thrower);
		dmgTaken = Capacity.#magicDefenseDmgTaken(target, dmgGiven, element);
		dmgTaken = Capacity.#multiplicator(dmgTaken, power);
		target.dmg(dmgTaken);
		state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
	
		return dmgTaken;
	}

	static magicAttack(state: State, attackName: string, thrower: AggregateCardComputedForFight, target: AggregateCardComputedForFight, power: number, element: string) {
		let dmgTaken = 0;
		if (Capacity.#touched(thrower, target)) {
			let dmgGiven = Capacity.#magicalStrikeDmgGiven(thrower);
			dmgTaken = Capacity.#magicDefenseDmgTaken(target, dmgGiven, element);
			dmgTaken = Capacity.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			state.addChatMessage(attackName + " gave " + dmgTaken + " damage.");
		} else {
			state.addChatMessage(attackName + " missed target.");
		}
		return dmgTaken;
	}

	static physicalAttack(state: State, attackName: string, thrower: AggregateCardComputedForFight, target:AggregateCardComputedForFight, power:number) {
		let dmgTaken = 0;
		if (Capacity.#touched(thrower, target)) {
			let dmgGiven = Capacity.physicalStrikeDmgGiven(state, thrower);
			dmgTaken = Capacity.#physicalDefenseDmgTaken(target, dmgGiven);
			dmgTaken = Capacity.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			state.addChatMessage(attackName + " gave " + dmgTaken +" damage.");
		} else {
			state.addChatMessage(attackName + " missed target.");
		}
		return dmgTaken;
	}


	static physicalStrikeDmgGiven(state: State, thrower: AggregateCardComputedForFight) {
		let dmg = Capacity.#computeNormalDamage(thrower.getPhysicalDamage());
		if (Capacity.#isCriticalDamage(thrower.getPhysicalCriticalRate())) {
			dmg = Capacity.#computeCriticalDamage(thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber()
			);
		}
		return dmg;
	}

	static #magicalStrikeDmgGiven(thrower: AggregateCardComputedForFight) {
		let dmg = Capacity.#computeNormalDamage(thrower.getMagicDamage());
		if (Capacity.#isCriticalDamage(thrower.getMagicCriticalRate())) {
			dmg = Capacity.#computeCriticalDamage(thrower.getMagicDamage(), thrower.getMagicCriticalNumber()
			);
		}
		return dmg;
	}

	static #physicalDefenseDmgTaken(target: AggregateCardComputedForFight, dmg: number) {
		dmg = dmg - Capacity.#computeDefense(target.getArmor());
		return dmg;
	}

	static #magicDefenseDmgTaken(target: AggregateCardComputedForFight, dmg: number, elementalType) {
		dmg = dmg - Capacity.#computeDefense(Capacity.#computeElementalResitance(target, elementalType));
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
export default Capacity;

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