import WorldLevel from "./WorldLevel/WorldLevel.js";
class AbstractWorld {
    constructor(container, title, background, baseCostBooster) {
        this._title = (title) ? title : this.constructor.name;
        this._background = background;
        this._container = container;
        this._baseCostBooster = baseCostBooster;
        this._boosterLevel = 0;
        this._itemClassList = new Map();
    }
    getWorldLeveldByNumber(lvlNumber) {
        let newWorldLevel = new WorldLevel();
        newWorldLevel.addMonster(this.getEnemy1(lvlNumber));
        return newWorldLevel;
    }
    getEnemy1(numberLevel) {
        return null;
    }
    getHeroList() {
        return null;
    }
    getItemList() {
        return null;
    }
    /*generateItem(): Item{
        let keys = Array.from(this._itemClassList.keys());
        let className: string = this._itemClassList.get(keys[Math.floor(Math.random() * keys.length)]);
        let item: Item = eval(`new ${className}()`);
        return item;
    }*/
    getName() { return this._title; }
    getTitle() { return this._title; }
    getBackground() { return this._background; }
    getPriceNextBooster() { return Math.floor(this._baseCostBooster * 1.10 ** (this._boosterLevel + 1)); }
    static geName() { return ""; }
}
export default AbstractWorld;
//# sourceMappingURL=AbstractWorld.js.map