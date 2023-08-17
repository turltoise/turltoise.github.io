import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World2_Hero1 from "../../Hero/World2_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World2 extends AbstractWorld {
	constructor(
		container: Container,
		title="Forest",
		background="Background"
		) {
		super(container, title, background, 75);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World2_Hero1(this._container, level));
		return map;
	}
}
export default World2;