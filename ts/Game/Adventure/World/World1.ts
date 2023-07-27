import Container from "../../../Container.js";
import Enemy from "../../Card/Enemy.js";
import AbstractWorld from "./AbstractWorld.js";
import World1_Enemy1 from "./World1/World1_Enemy1.js";

class World1 extends AbstractWorld {
	constructor(container: Container, title: string = "Meadow", background?: string) {
		super(container, title, background, 4);
	}

	getEnemy1(numberLevel: number): Enemy {
		return new World1_Enemy1(this._container, numberLevel);
	}
}
export default World1;