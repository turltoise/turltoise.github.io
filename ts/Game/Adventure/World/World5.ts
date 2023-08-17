import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World5_Hero1 from "../../Hero/World5_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World5 extends AbstractWorld {
	constructor(
		container: Container,
		title="Beach",
		background="Background"
		) {
		super(container, title, background, 40000);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World5_Hero1(this._container, level));
		return map;
	}
}
export default World5;