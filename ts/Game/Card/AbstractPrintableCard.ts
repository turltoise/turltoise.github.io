import Container from "../../Container.js";
import UUID from "../Tools/UUID.js";
import CardAnimation from "./CardAnimation.js";
import CardGraphicSetting from "./CardGraphicSetting.js";

class AbstractPrintableCard {
    protected _container: Container;
    protected _title: string;
    protected _img: string;
    protected _uuid: string;
    protected _fightAnimation: Map<string, CardAnimation>;
    protected _cinematicText: string;
    protected _cardGraphicSetting: CardGraphicSetting;

    constructor(container: Container, title: string, img: string, uuid: string, cardGraphicSetting: CardGraphicSetting) {
        this._container = container;
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
        this._cinematicText  = null;
        this._cardGraphicSetting = cardGraphicSetting;
    }
    getImg(): string {return this._img;}
    getTitle() : string {return this._title;}
    getUUID() : string {return this._uuid;}
    getCurrentLife(): number {return 0;}
    getMaxLife(): number {return 0;}
    isYours(): boolean {return null;}
    
    setCinematicText(text: string): void {this._cinematicText = text;}
    getCinematicText(): string {return this._cinematicText;}

    getCardGraphicSetting(){return this._cardGraphicSetting;}

    getFightAnimationMap() : Map<string, CardAnimation> {return this._fightAnimation;}
	addFightAnimation(animation: CardAnimation, uuid: string = UUID.generateUUID()) {this._fightAnimation.set(uuid, animation);}
	resetFigthAnimationMap() : void {this._fightAnimation = new Map();}
}
export default AbstractPrintableCard;