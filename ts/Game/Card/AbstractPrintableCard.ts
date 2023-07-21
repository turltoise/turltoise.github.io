import UUID from "../Tools/UUID.js";
import CardAnimation from "./CardAnimation.js";

class AbstractPrintableCard {
    protected _title: string;
    protected _img: string;
    protected _uuid: string;
    private _fightAnimation: Map<string, CardAnimation>;

    constructor(title: string, img: string, uuid: string) {
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
    }
    getImg(): string {return this._img;}
    getTitle() : string {return this._title;}
    getUUID() : string {return this._uuid;}

    getFightAnimationMap() : Map<string, CardAnimation> {return this._fightAnimation;}
	addFightAnimation(animation: CardAnimation, uuid: string = UUID.generateUUID()) {this._fightAnimation.set(uuid, animation);}
	resetFigthAnimationMap() : void {this._fightAnimation = new Map();}
}
export default AbstractPrintableCard;