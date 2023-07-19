import State from "../State/State.js";
import AbstractWorld from "./World/AbstractWorld.js";
import Beach from "./World/Beach.js";
import Cave from "./World/Cave.js";
import Desert from "./World/Desert.js";
import Forest from "./World/Forest.js";
import Heaven from "./World/Heaven.js";
import Hell from "./World/Hell.js";
import Meadow from "./World/Meadow.js";
import Mountain from "./World/Mountain.js";
import Ocean from "./World/Ocean.js";

class WorldList {
	private _list: Map<number, AbstractWorld>;
	constructor() {
	}

	generateWorldList(state: State) {
		this._list = new Map();
		this._list.set(1, new Meadow(state));
		this._list.set(2, new Forest(state));
		this._list.set(3, new Desert(state));
		this._list.set(4, new Mountain(state));
		this._list.set(5, new Beach(state));
		this._list.set(6, new Ocean(state));
		this._list.set(7, new Cave(state));
		this._list.set(8, new Hell(state));
		this._list.set(9, new Heaven(state));
	}

	getList(): Map<number, AbstractWorld> {
		return this._list;
	}

	// static call # TODO rework
	static getListName() {
		const levelList = new Map();
		levelList.set(1, "Meadow");
		levelList.set(2, "Forest");
		levelList.set(3, "Desert");
		levelList.set(4, "Mountain");
		levelList.set(5, "Beach");
		levelList.set(6, "Ocean");
		levelList.set(7, "Cave");
		levelList.set(8, "Hell");
		levelList.set(9, "Heaven");
		return levelList;
	}
}
export default WorldList;

