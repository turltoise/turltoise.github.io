import Container from "../../../../Container.js";
import StackPlayCard from "../../../Card/StackPlayCard.js";
import Element from "../../Element.js";
import Status from "../../Status/Status.js";
import CapacityMessage from "../CapacityMessage.js";

class CoreCapacity {
	protected _container: Container;

	constructor(container: Container) {
		this._container = container;
	}

     putStatus(attackName: string, thrower: StackPlayCard, target: StackPlayCard, status: Status) {
		if (this.#touched(thrower, target)) {
			target.addStatus(status);
			CapacityMessage.putStatus(this._container, attackName, target);
		} else {
			CapacityMessage.failed(this._container, attackName);
		}
	}

	 annoucementCapacityWithFocus(attackName: string, thrower: StackPlayCard, target: StackPlayCard) {
		CapacityMessage.capacityWithFocus(this._container, attackName, thrower, target);
	}

	 heal(thrower: StackPlayCard, target: StackPlayCard, power: number, heal?: number):  number {
		if (heal === null) {
			heal = this.#magicalStrikeDmgGiven(thrower);
		}
		heal = this.#multiplicator(heal, power);
		target.heal(heal);
		CapacityMessage.heal(this._container, target, heal);
		return heal;
	}

	 shield(thrower: StackPlayCard, target: StackPlayCard, power: number, shield?: number):  number {
		if (shield === null) {
			shield = this.#magicalStrikeDmgGiven(thrower);
		}
		shield = this.#multiplicator(shield, power);
		target.shield(shield);
		CapacityMessage.shield(this._container, target, shield);
		return shield;
	}

	 magicProc(attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
		let dmgTaken = 0;

		let normalDmg = this.#magicalStrikeDmgGiven(thrower);
			let criticalDmg = this.#magicalCriticalStrikeDmgGiven(thrower);
			let dmgGiven = normalDmg + criticalDmg; 
			dmgTaken = this.#magicDefenseDmgTaken(target, dmgGiven, element);
			dmgTaken = this.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
		CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, element);
	
		return dmgTaken;
	}

	 magicAttack(attackName: string, thrower: StackPlayCard, target: StackPlayCard, power: number, element: string):  number {
		let dmgTaken = 0;
		if (this.#touched(thrower, target)) {
			let normalDmg = this.#magicalStrikeDmgGiven(thrower);
			let criticalDmg = this.#magicalCriticalStrikeDmgGiven(thrower);
			let dmgGiven = normalDmg + criticalDmg; 
			dmgTaken = this.#magicDefenseDmgTaken(target, dmgGiven, element);
			dmgTaken = this.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, element);
		} else {
			CapacityMessage.failed(this._container, attackName);
		}
		return dmgTaken;
	}

	 physicalAttack(attackName: string, thrower: StackPlayCard, target:StackPlayCard, power:number):  number {
		let dmgTaken = 0;
		if (this.#touched(thrower, target)) {
			let normalDmg = this.#physicalStrikeDmgGiven(thrower);
			let criticalDmg = this.#physicalCriticalStrikeDmgGiven(thrower);
			let dmgGiven = normalDmg + criticalDmg; 
			dmgTaken = this.#physicalDefenseDmgTaken(target, dmgGiven);
			dmgTaken = this.#multiplicator(dmgTaken, power);
			target.dmg(dmgTaken);
			CapacityMessage.damage(this._container, attackName, dmgTaken, criticalDmg, null);
		} else {
			CapacityMessage.failed(this._container, attackName);
		}
		return dmgTaken;
	}


	 #physicalStrikeDmgGiven(thrower: StackPlayCard):  number {
		return this.#computeNormalDamage(thrower.getPhysicalDamage());
	}

	#physicalCriticalStrikeDmgGiven(thrower: StackPlayCard): number {
		let dmg = 0;
		if (this.#isCriticalDamage(thrower.getPhysicalCriticalRate())) {
			dmg = this.#computeCriticalDamage(thrower.getPhysicalDamage(), thrower.getPhysicalCriticalNumber());
		}
		return dmg;
	}

	 #magicalStrikeDmgGiven(thrower: StackPlayCard):  number {
		return this.#computeNormalDamage(thrower.getMagicDamage());
	}

	#magicalCriticalStrikeDmgGiven(thrower: StackPlayCard): number {
		let dmg = 0;
		if (this.#isCriticalDamage(thrower.getMagicCriticalRate())) {
			dmg = this.#computeCriticalDamage(thrower.getMagicDamage(), thrower.getMagicCriticalNumber());
		}
		return dmg;
	}

	 #physicalDefenseDmgTaken(target: StackPlayCard, dmg: number):  number {
		dmg = dmg - this.#computeDefense(target.getArmor());
		return dmg;
	}

	 #magicDefenseDmgTaken(target: StackPlayCard, dmg: number, elementalType: string):  number {
		dmg = dmg - this.#computeDefense(this.#computeElementalResitance(target, elementalType));
		return dmg;
	}

	 #touched(thrower: StackPlayCard, target: StackPlayCard): boolean {
		let rate = thrower.getAccuracy() - target.getEscape();
		return this.#computeRand1on2(rate) ? true : false;
	}

	 #multiplicator(value: number, percentage: number): number{
		return Math.floor(value * percentage / 100);
	}

	 #computeNormalDamage(damage: number): number {
		return damage;
	}
	 #isCriticalDamage(rate: number): boolean {return this.#computeRand1on2(rate) > 100 ? true : false;}
	 #computeCriticalDamage(normal: number, critical: number): number {return normal + critical; }
	 #computeDefense(defense: number): number {return defense;}
	 #computeElementalResitance(target: StackPlayCard, elementalType: string): number {
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

	 #computeRand1on2(rate: number): number{
		return rate + 50 + this.#rand1To100();
	}

	 #rand1To100(): number{
		return Math.floor(Math.random() * 100) + 1;
	}
}
export default CoreCapacity;