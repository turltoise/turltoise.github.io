class Resource {
    constructor(gold = 0) {
        this._gold = gold;
    }
    addGold(gold) {
        this._gold += gold;
    }
    getGold() {
        return this._gold;
    }
}
export default Resource;
//# sourceMappingURL=Resource.js.map