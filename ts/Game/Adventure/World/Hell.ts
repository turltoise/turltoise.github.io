import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class Hell extends AbstractWorld {
	constructor(
		container: Container,
		title="Title",
		background="Background"
		) {
		super(container, title, background, 15000000);
		this.addWorldLevel(this.#generateWorldLevelOne());
		this.addWorldLevel(this.#generateWorldLevelTwo());
		this.addWorldLevel(this.#generateWorldLevelThree());
	}

	#generateWorldLevelOne() {
		return new WorldLevel();
	}

	#generateWorldLevelTwo() {
		return new WorldLevel();
	}

	#generateWorldLevelThree() {
		return new WorldLevel();
	}
}
export default Hell;