class WorldLevel {
    constructor() {
        this._monsterList = new Map();
    }
    addMonster(card) {
        let size = this._monsterList.size;
        this._monsterList.set(size + 1, card);
    }
    getMonsterList() {
        return this._monsterList;
    }
}
export default WorldLevel;
//# sourceMappingURL=WorldLevel.js.map