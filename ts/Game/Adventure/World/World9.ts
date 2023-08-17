import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World9_Hero1 from "../../Hero/World9_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World9 extends AbstractWorld {
	constructor(
		container: Container,
		title="Heaven",
		background="Background"
		) {
		super(container, title, background, 320000000);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World9_Hero1(this._container, level));
		return map;
	}
}
export default World9;