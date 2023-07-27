import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
import Item from "./Item.js";
import UUID from "../Tools/UUID.js";
import RawCarac from "./RawCarac.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import PlayCard from "./PlayCard.js";
import Container from "../../Container.js";

class Hero extends CollectionCard {
	private _itemList: Map<string, Item>;

	constructor(container: Container, rawCarac: RawCarac, level: number, title: string, img: string, capacities: Map<string, AbstractCapacity> = new Map()) {
		super(container, rawCarac, level, title, img, capacities);
		this._itemList = new Map(); 
	}

	addItem(item : Item) {
		item = item;
		this._itemList.set(UUID.generateUUID(), item);
	}

	removeItemWithUUID(uuid) {
		return this._itemList.delete(uuid);
	}

	getItemWithUUID(uuid) {
		return this._itemList.get(uuid);
	}

	getItemMap() {
		return this._itemList;
	}

	getStackPlayCard(): StackPlayCard {
		let playCardList = <Map<string, PlayCard>> new Map();
		this._itemList.forEach((item: Item)=> {
			playCardList.set(item.getUUID(), item.getPlayCard());
		});
		playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
		return new StackPlayCard(this._container, playCardList);
	}
}

export default Hero;