import WorldLevel from "./WorldLevel/WorldLevel.js";
class AbstractWorld {
    constructor(container, title, background, baseCostBooster) {
        this._title = (title) ? title : this.constructor.name;
        this._background = background;
        this._container = container;
        this._baseCostBooster = baseCostBooster;
        this._boosterLevel = 0;
    }
    getWorlLeveldByNumber(lvlNumber) {
        let newWorldLevel = new WorldLevel();
        newWorldLevel.addMonster(this.getEnemy1(lvlNumber));
        return newWorldLevel;
    }
    getEnemy1(numberLevel) {
        return null;
    }
    getName() { return this._title; }
    getTitle() { return this._title; }
    getBackground() { return this._background; }
    getPriceNextBooster() { return Math.floor(this._baseCostBooster * 1.10 ** (this._boosterLevel + 1)); }
    static geName() { return ""; }
}
export default AbstractWorld;
//# sourceMappingURL=AbstractWorld.js.map