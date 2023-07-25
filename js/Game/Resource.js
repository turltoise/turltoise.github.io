class Resource {
    constructor(gold = 10000) {
        this._gold = gold;
    }
    addGold(gold) {
        this._gold += gold;
    }
    removeGold(gold) {
        this._gold -= gold;
    }
    getGold() {
        return this._gold;
    }
}
export default Resource;
//# sourceMappingURL=Resource.js.map