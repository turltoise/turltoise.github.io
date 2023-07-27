import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World7 extends AbstractWorld {
	constructor(
		container: Container,
		title="Cave",
		background="Background"
		) {
		super(container, title, background, 1800000);
	}
}
export default World7;