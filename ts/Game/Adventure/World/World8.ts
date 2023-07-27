import Container from "../../../Container.js";
import AbstractWorld from "./AbstractWorld.js";

class World8 extends AbstractWorld {
	constructor(
		container: Container,
		title="Hell",
		background="Background"
		) {
		super(container, title, background, 15000000);
	}
}
export default World8;