class AbstractWorld {
    constructor(state, title, background) {
        this._title = (title) ? title : this.constructor.name;
        this._background = background;
        this._worldLevelList = new Map();
        this._state = state;
    }
    addWorldLevel(worldLevel) {
        let size = this._worldLevelList.size;
        this._worldLevelList.set(size + 1, worldLevel);
    }
    getWorlLeveldByNumber(number) {
        return this._worldLevelList.get(number);
    }
    getState() { return this._state; }
    getName() { return this.constructor.name; }
    getTitle() { return this._title; }
    getBackground() { return this._background; }
}
export default AbstractWorld;
//# sourceMappingURL=AbstractWorld.js.map