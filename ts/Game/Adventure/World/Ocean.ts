import AbstractWorld from "./AbstractWorld.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class Ocean extends AbstractWorld {
	constructor(
		title="Title",
		background="Background"
		) {
		super(title,background);
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
export default Ocean;