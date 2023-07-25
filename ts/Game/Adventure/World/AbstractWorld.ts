import Container from "../../../Container.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class AbstractWorld {
	protected _container: Container;
	private _title: string;
	private _background: string;
	private _worldLevelList: Map<number, WorldLevel>;
	private _baseCostBooster: number;
	private _boosterLevel: number;

	constructor(container: Container, title?: string, background?: string, baseCostBooster?: number) {
		this._title = (title) ? title : this.constructor.name;
		this._background = background;
		this._worldLevelList = new Map();
		this._container = container;
		this._baseCostBooster = baseCostBooster;
		this._boosterLevel = 0;
	}

	addWorldLevel(worldLevel: WorldLevel) {
		let size = this._worldLevelList.size
		this._worldLevelList.set(size+1, worldLevel);
	}

	getWorlLeveldByNumber(number: number): WorldLevel {
		return this._worldLevelList.get(number);
	}

	getName(): string {return this.constructor.name;}
	getTitle(): string {return this._title;}
	getBackground(): string {return this._background;}

	getPriceNextBooster(): number {return Math.floor(this._baseCostBooster * 1.10 ** (this._boosterLevel + 1));}
}

export default AbstractWorld;