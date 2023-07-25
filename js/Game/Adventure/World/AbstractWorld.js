class AbstractWorld {
    constructor(container, title, background, baseCostBooster) {
        this._title = (title) ? title : this.constructor.name;
        this._background = background;
        this._worldLevelList = new Map();
        this._container = container;
        this._baseCostBooster = baseCostBooster;
        this._boosterLevel = 0;
    }
    addWorldLevel(worldLevel) {
        let size = this._worldLevelList.size;
        this._worldLevelList.set(size + 1, worldLevel);
    }
    getWorlLeveldByNumber(number) {
        return this._worldLevelList.get(number);
    }
    getName() { return this.constructor.name; }
    getTitle() { return this._title; }
    getBackground() { return this._background; }
    getPriceNextBooster() { return Math.floor(this._baseCostBooster * 1.10 ** (this._boosterLevel + 1)); }
}
export default AbstractWorld;
//# sourceMappingURL=AbstractWorld.js.map