import Container from "../../../Container.js"
import CollectionCard from "../../Card/CollectionCard.js";
import World3_Hero1 from "../../Hero/World3_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World3 extends AbstractWorld {
	constructor(
		container: Container,
		title="Desert",
		background="Background"
		) {
		super(container, title, background, 600);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World3_Hero1(this._container, level));
		return map;
	}
}
export default World3;