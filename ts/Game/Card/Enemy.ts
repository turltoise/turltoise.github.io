import StackPlayCard from "./StackPlayCard.js";
import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import PlayCard from "./PlayCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";

class Enemy extends CollectionCard {
	private _gold: number;

	constructor(rawCarac: RawCarac, level: number, title: string, img: string, gold: number = 5, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(rawCarac, level, title, img, capacities);
		this._gold = gold;
	}

	getStackPlayCard(): StackPlayCard {
		let playCardList = <Map<string, PlayCard>> new Map();
		playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
		return new StackPlayCard(playCardList);
	}

	getGold() {
		return this._gold;
	}
}
export default Enemy;