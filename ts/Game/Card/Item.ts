import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import Container from "../../Container.js";
import UUID from "../Tools/UUID.js";
import CardGraphicSetting from "./CardGraphicSetting.js";
import Hero from "./Hero.js";

class Item extends CollectionCard {
	private _heroLinked: Hero;
	constructor(
		container: Container,
		rawCarac: RawCarac,
		level: number,
		title: string,
		img: string, capacities: Map<string,
		AbstractCapacity> = new Map(),
		cardGraphicSetting: CardGraphicSetting,
		uuid: string
	) {
		super(container, rawCarac, level, title, img, capacities, uuid, cardGraphicSetting);
		this._heroLinked =  null;
	}

	isItem(): boolean {return true;}

	isHeroLinked(): boolean {return (this._heroLinked)? true : false;}
	getHeroLinked(): Hero {return this._heroLinked;}
	removeHeroLinked(): void {this._heroLinked  = null;}
	setHeroLinked(hero: Hero): void {this._heroLinked  = hero;}

}
export default Item;