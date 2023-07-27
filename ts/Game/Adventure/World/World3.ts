import Container from "../../../Container.js"
import AbstractWorld from "./AbstractWorld.js";

class World3 extends AbstractWorld {
	constructor(
		container: Container,
		title="Desert",
		background="Background"
		) {
		super(container, title, background, 600);
	}
}
export default World3;