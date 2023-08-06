import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
import Item from "./Item.js";
import UUID from "../Tools/UUID.js";
import RawCarac from "./RawCarac.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import PlayCard from "./PlayCard.js";
import Container from "../../Container.js";
import CardGraphicSetting from "./CardGraphicSetting.js";

class Hero extends CollectionCard {
	private _itemList: Map<string, Item>;
	private _currentXP: number;

	constructor(
		container: Container,
		rawCarac: RawCarac,
		level: number,
		title: string,
		img: string,
		capacities: Map<string, AbstractCapacity> = new Map(),
		cardGraphicSetting:CardGraphicSetting
	) {
		super(container, rawCarac, level, title, img, capacities, UUID.generateUUID(), cardGraphicSetting);
		this._itemList = new Map();
		this._currentXP =  0;
	}

	static getMaxItem(): number {return 3;}

	getXP(): number {return this._currentXP;}
	getXPForNextLevel(): number {return this._level + 1;}

	addItem(item : Item) {
		item = item;
		this._itemList.set(item.getUUID(), item);
	}
	removeItemWithUUID(uuid: string) {return this._itemList.delete(uuid);}
	getItemWithUUID(uuid: string) {return this._itemList.get(uuid);}
	getItemMap(): Map<string, Item> {return this._itemList;}

	getStackPlayCard(): StackPlayCard {
		let playCardList = <Map<string, PlayCard>> new Map();
		this._itemList.forEach((item: Item)=> {
			playCardList.set(item.getUUID(), item.getPlayCard());
		});
		playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
		return new StackPlayCard(this._container, playCardList, this._cardGraphicSetting);
	}
}

export default Hero;