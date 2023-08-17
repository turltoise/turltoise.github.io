import Container from "../../../Container.js";
import CollectionCard from "../../Card/CollectionCard.js";
import World7_Hero1 from "../../Hero/World7_Hero1.js";
import UUID from "../../Tools/UUID.js";
import AbstractWorld from "./AbstractWorld.js";

class World7 extends AbstractWorld {
	constructor(
		container: Container,
		title="Cave",
		background="Background"
		) {
		super(container, title, background, 1800000);
	}

	getHeroListByLevel(level: number): Map <string, CollectionCard> {
		let map = new Map();
		map.set(UUID.generateUUID(), new World7_Hero1(this._container, level));
		return map;
	}
}
export default World7;