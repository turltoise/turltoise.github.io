import Container from "../../Container.js";
import AbstractWorld from "./World/AbstractWorld.js";
import World5 from "./World/World5.js";
import World7 from "./World/World7.js";
import World3 from "./World/World3.js";
import World2 from "./World/World2.js";
import World9 from "./World/World9.js";
import World8 from "./World/World8.js";
import World1 from "./World/World1.js";
import World4 from "./World/World4.js";
import World6 from "./World/World6.js";

class WorldList {
	private _container: Container;
	private _list: Map<number, AbstractWorld>;
	constructor(container: Container) {
		this._container = container;
		this._list = new Map();
		this._list.set(1, new World1(this._container));
		this._list.set(2, new World2(this._container));
		this._list.set(3, new World3(this._container));
		this._list.set(4, new World4(this._container));
		this._list.set(5, new World5(this._container));
		this._list.set(6, new World6(this._container));
		this._list.set(7, new World7(this._container));
		this._list.set(8, new World8(this._container));
		this._list.set(9, new World9(this._container));
	}

	getList(): Map<number, AbstractWorld> {
		return this._list;
	}

	getFirst(): AbstractWorld {
		return this._list.values().next().value;
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

