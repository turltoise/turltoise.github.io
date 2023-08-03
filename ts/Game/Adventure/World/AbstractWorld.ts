import Container from "../../../Container.js";
import Enemy from "../../Card/Enemy.js";
import Item from "../../Card/Item.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class AbstractWorld {
	protected _container: Container;
	private _title: string;
	private _background: string;
	private _baseCostBooster: number;
	private _boosterLevel: number;
	protected _itemClassList: Map<string, string>;

	constructor(container: Container, title?: string, background?: string, baseCostBooster?: number) {
		this._title = (title) ? title : this.constructor.name;
		this._background = background;
		this._container = container;
		this._baseCostBooster = baseCostBooster;
		this._boosterLevel = 0;
		this._itemClassList = new Map();
	}

	getWorldLeveldByNumber(lvlNumber: number): WorldLevel {
		let newWorldLevel:WorldLevel  = new WorldLevel();
		newWorldLevel.addMonster(this.getEnemy1(lvlNumber));
		return newWorldLevel;
	}

	getEnemy1(numberLevel: number): Enemy{
		return null;
	}

	generateItem(): Item{
		let keys = Array.from(this._itemClassList.keys());
		let className: string = this._itemClassList.get(keys[Math.floor(Math.random() * keys.length)]);
		let item: Item = eval(`new ${className}()`);
		return item;
	}

	getName(): string {return this._title;}
	getTitle(): string {return this._title;}
	getBackground(): string {return this._background;}

	getPriceNextBooster(): number {return Math.floor(this._baseCostBooster * 1.10 ** (this._boosterLevel + 1));}

	static geName(): string {return "";}
}

export default AbstractWorld;