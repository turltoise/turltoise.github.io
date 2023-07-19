import AbstractBuff from "./List/AbstractBuff.js";
import AbstractTick from "./List/AbstractTick.js";


class Status {
    private _name: string;
    private _turn: number;
    private _buff: AbstractBuff;
    private _tick: AbstractTick; 

	constructor(name: string, turn :number, buff :AbstractBuff, tick: AbstractTick) {
        this._name = name;
        this._turn = turn;
        this._buff = buff;
        this._tick = tick;
    }
    getName(): string {return  this._name;}
    getTurn(): number {return  this._turn;}
    getBuff(): AbstractBuff {return  this._buff;}
    getTick(): AbstractTick {return  this._tick;}
    setTurn(turn: number) {this._turn=turn;}
}

export default Status;