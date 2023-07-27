import StackPlayCard from "./StackPlayCard.js";
import RawCarac from "./RawCarac.js";
import CollectionCard from "./CollectionCard.js";
import PlayCard from "./PlayCard.js";
import AbstractCapacity from "../Fight/Capacity/List/AbstractCapacity.js";
import Container from "../../Container.js";
import CardGraphicSetting from "./CardGraphicSetting.js";
import UUID from "../Tools/UUID.js";

class Enemy extends CollectionCard {
	private _gold: number;

	constructor(
		container: Container,
		rawCarac: RawCarac,
		levelNumber: number,
		title: string,
		img: string,
		gold: number = 5,
		capacities: Map<string, AbstractCapacity> = new Map(),
		cardGraphicSetting: CardGraphicSetting
	) {
		super(container, rawCarac, levelNumber, title, img, capacities, UUID.generateUUID() ,cardGraphicSetting);
		this._gold = gold;
	}

	getStackPlayCard(): StackPlayCard {
		let playCardList = <Map<string, PlayCard>> new Map();
		playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
		return new StackPlayCard(this._container, playCardList, this._cardGraphicSetting);
	}

	getGold(): number {
		return Math.floor(this._gold * 1.05 ** this._levelNumber);
	}
}
export default Enemy;