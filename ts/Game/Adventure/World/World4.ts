import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World4 extends AbstractWorld {
	constructor(
		container: Container,
		title="Mountain",
		background="Background"
		) {
		super(container, title, background, 3000);
	}
}
export default World4;