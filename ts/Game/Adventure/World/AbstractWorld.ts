import Container from "../../../Container.js";
import WorldLevel from "./WorldLevel/WorldLevel.js";

class AbstractWorld {
	protected _container: Container;
	private _title: string;
	private _background: string;
	private _worldLevelList: Map<number, WorldLevel>;

	constructor(container: Container, title?: string, background?: string) {
		this._title = (title) ? title : this.constructor.name;
		this._background = background;
		this._worldLevelList = new Map();
		this._container = container;
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
}

export default AbstractWorld;