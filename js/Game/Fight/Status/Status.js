class Status {
    constructor(name, turn, buff, tick) {
        this._name = name;
        this._turn = turn;
        this._buff = buff;
        this._tick = tick;
    }
    getName() { return this._name; }
    getTurn() { return this._turn; }
    getBuff() { return this._buff; }
    getTick() { return this._tick; }
    setTurn(turn) { this._turn = turn; }
}
export default Status;
//# sourceMappingURL=Status.js.map