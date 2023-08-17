import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World4_Hero1 from "../../Hero/World4_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World4 extends AbstractWorld {
	constructor(
		container: Container,
		title="Mountain",
		background="Background"
		) {
		super(container, title, background, 3000);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World4_Hero1(this._container, level));
		return map;
	}
}
export default World4;