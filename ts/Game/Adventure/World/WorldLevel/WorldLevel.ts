import Enemy from "../../../Card/Enemy.js";

class WorldLevel {
	private _monsterList: Map<number, Enemy>;
	constructor() {
		this._monsterList = new Map();
	}

	addMonster(card: Enemy) {
		let size = this._monsterList.size
		this._monsterList.set(size+1, card);
	}

	getMonsterList() {
		return this._monsterList;
	}
}

export default WorldLevel;