class Resource  {
	private _gold: number;
	constructor(gold: number = 10000) {
		this._gold = gold;
	}

	addGold(gold: number) {
		this._gold += gold;
	}

	removeGold(gold: number) {
		this._gold -= gold;
	}

	getGold(): number {
		return this._gold;
	}
}
export default Resource;