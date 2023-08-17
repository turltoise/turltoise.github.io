import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World8_Hero1 from "../../Hero/World8_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World8 extends AbstractWorld {
	constructor(
		container: Container,
		title="Hell",
		background="Background"
		) {
		super(container, title, background, 15000000);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World8_Hero1(this._container, level));
		return map;
	}
}
export default World8;