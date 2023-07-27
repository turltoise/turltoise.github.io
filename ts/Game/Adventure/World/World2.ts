import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World2 extends AbstractWorld {
	constructor(
		container: Container,
		title="Forest",
		background="Background"
		) {
		super(container, title, background, 75);
	}
}
export default World2;