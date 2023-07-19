import Enemy from "../../Card/Enemy.js";
import RawCarac from "../../Card/RawCarac.js";
import PhysicalAttack from "../../Fight/Capacity/List/PhysicalAttack.js";
import State from "../../State/State.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class Meadow extends AbstractWorld {
	private _caracE: RawCarac;
	constructor(state: State, title?: string, background?: string) {
		super(state, title, background);

		this._caracE = new RawCarac(
			1,//strength=null,
			1,//dexterity=null,
			1,//intelligence=null,
			1,//luck=null,

			1,//physicalDamage=null,
			1,//physicalCriticalRate=null,
			1,//physicalCriticalNumber=null,

			1,//magicDamage=null,
			1,//magicCriticalRate=null,
			1,//magicCriticalNumber=null,

			1,//fireResistance=null,
			1,//waterResistance=null,
			1,//plantResistance=null,
			1,//necromancyResistance=null,
			1,//blessingResistance=null,
			1,//armor=null,

			1,//accuracy=null,
			1,//escape=null,

			30,//life=null
		);
		this.addWorldLevel(this.#generateWorldLevelOne());
		this.addWorldLevel(this.#generateWorldLevelTwo());
		this.addWorldLevel(this.#generateWorldLevelThree());
	}

	#generateWorldLevelOne() {
		const capacities1 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy1 = new Enemy(this._caracE, 1, 'Level 1 enemy', "illidan.webp", 5, capacities1);

		const worldLevel = new WorldLevel();
		worldLevel.addMonster(enemy1);

		return worldLevel;
	}

	#generateWorldLevelTwo() {
		const capacities1 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy1 = new Enemy(this._caracE, 1, 'Level 1 enemy', "illidan.webp", 5, capacities1);
		const capacities2 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy2 = new Enemy(this._caracE, 2, 'Level 2 enemy', "illidan.webp", 10, capacities2);
		const worldLevel = new WorldLevel();
		worldLevel.addMonster(enemy1);
		worldLevel.addMonster(enemy2);

		return worldLevel;
	}

	#generateWorldLevelThree() {
		const capacities1 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy1 = new Enemy(this._caracE, 1, 'Level 1 enemy', "illidan.webp", 5, capacities1);
		const capacities2 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy2 = new Enemy(this._caracE, 2, 'Level 2 enemy', "illidan.webp", 10, capacities2);
		const capacities3 = new Map([[UUID.generateUUID(), new PhysicalAttack(this._state)]]);
		const enemy3 = new Enemy(this._caracE, 3, 'Level 3 enemy', "illidan.webp", 15, capacities3);

		const worldLevel = new WorldLevel();
		worldLevel.addMonster(enemy1);
		worldLevel.addMonster(enemy2);
		worldLevel.addMonster(enemy3);
		return worldLevel;
	}
}
export default Meadow;