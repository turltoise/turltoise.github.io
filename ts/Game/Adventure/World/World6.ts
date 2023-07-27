import Container from "../../../Container.js"
import AbstractWorld from "./AbstractWorld.js";

class World6 extends AbstractWorld {
	constructor(
		container: Container,
		title="Ocean",
		background="Background"
		) {
		super(container, title, background, 600000);
	}
}
export default World6;