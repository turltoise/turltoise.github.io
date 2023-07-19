import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import RawCarac from "./RawCarac.js";
import RawCardLevelComputed from "./RawCardLevelComputed.js";

class Item extends RawCardLevelComputed {

	constructor(rawCarac: RawCarac, level: number, title: string, img: string, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(rawCarac, level, title, img, capacities);

	}

}
export default Item;