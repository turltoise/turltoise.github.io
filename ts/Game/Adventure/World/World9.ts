import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World9 extends AbstractWorld {
	constructor(
		container: Container,
		title="Heaven",
		background="Background"
		) {
		super(container, title, background, 320000000);
	}
}
export default World9;