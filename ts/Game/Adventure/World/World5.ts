import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World5 extends AbstractWorld {
	constructor(
		container: Container,
		title="Beach",
		background="Background"
		) {
		super(container, title, background, 40000);
	}
}
export default World5;