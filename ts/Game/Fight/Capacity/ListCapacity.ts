import Capacity from "./Capacity.js";
import Element from "../Element.js";
import State from "../../State/State.js";
import Status from "../Status/Status.js";
import AttackBuff from "../Status/List/AttackBuff.js";
import PoisonTick from "../Status/List/PoisonTick.js";

class ListCapacity {
	private _state: State;
	private _list: Map<string, (thrower: any, target: any) => void>;
	constructor(state: State) {
		this._state = state;	
		this._list.set(
			"life_steal_sword_strike",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "life_steal_sword_strike", thrower, target);
				let dmgTaken = Capacity.physicalAttack(this._state, "life_steal_sword_strike", thrower, target, 80);
				if (dmgTaken > 0) {
					Capacity.heal(this._state, thrower, target, 20, dmgTaken);
				}
			}
		);

		this._list.set(
			"physical_attack",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "physical_attack", thrower, target);
				Capacity.physicalAttack(this._state, "physical_attack", thrower, target, 100);
			}
		);

		this._list.set(
			"fire_ball",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "fire_ball", thrower, target);
				Capacity.magicAttack(this._state, "fire_ball", thrower, target, 130, Element.FIRE());
			}
		);

		this._list.set(
			"heal",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "heal", thrower, target);
				Capacity.shield(this._state, thrower, target, 100, null);
			}
		);

		this._list.set(
			"shield",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "shield", thrower, target);
				Capacity.shield(this._state, thrower, target, 120, null);
			}
		);

		this._list.set(
			"poison",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "poison", thrower, target);
				const status = new Status("poison", 3, null, new PoisonTick(this._state, thrower, target)); 
				Capacity.putStatus(this._state, "poison", thrower, target, status);
			}
		);

		this._list.set(
			"attack_buff",
			function(thrower, target) {
				Capacity.annoucementCapacityWithFocus(this._state, "attack_buff", thrower, target);
				const status = new Status("attack_buff", 5, new AttackBuff(this._state, thrower, target), null);
				Capacity.putStatus(this._state, "attack_buff", thrower, target, status);
			}
		);
	}
}

export default ListCapacity;