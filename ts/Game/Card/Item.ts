import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import Container from "../../Container.js";

class Item extends CollectionCard {

	constructor(container: Container,rawCarac: RawCarac, level: number, title: string, img: string, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(container, rawCarac, level, title, img, capacities);

	}

}
export default Item;