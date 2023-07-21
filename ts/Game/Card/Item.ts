import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";

class Item extends CollectionCard {

	constructor(rawCarac: RawCarac, level: number, title: string, img: string, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(rawCarac, level, title, img, capacities);

	}

}
export default Item;