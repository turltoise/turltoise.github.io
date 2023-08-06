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
    protected _level;

    protected _combatSpriteText: string;
    protected _combatSpriteIndex: number;
    protected _combatSpriteTimeCounter: number; // to loop on the same sprite several times

    protected _cardGraphicSetting: CardGraphicSetting;

    constructor(
        container: Container,
        title: string,
        img: string,
        uuid: string,
        cardGraphicSetting: CardGraphicSetting,
        level: number
     ) {
        this._container = container;
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
        this._combatSpriteText  = null;
        this._cardGraphicSetting = cardGraphicSetting;
        this._level = level;
    }
    getImg(): string {return this._img;}
    getLevel(): number {return this._level;}
    getTitle() : string {return this._title;}
    getUUID() : string {return this._uuid;}
    getCurrentLife(): number {return 0;}
    getMaxLife(): number {return 0;}
    isYours(): boolean {return null;}
    isItem(): boolean {return null;}
    
    setCombatSpriteText(text: string): void {this._combatSpriteText = text;}
    getCombatSpriteText(): string {return this._combatSpriteText;}

    resetCombatSpriteIndex(): void {this._combatSpriteIndex = -1;}
    setCombatSpriteIndex(index: number): void {this._combatSpriteIndex = index;}
    getCombatSpriteIndex(): number {return this._combatSpriteIndex;}
    incrementCombatSpriteIndex(): void {this._combatSpriteIndex += 1;}

    resetCombatSpriteTimeCounter(): void {this._combatSpriteTimeCounter = -1;}
    setCombatSpriteTimeCounter(index: number): void {this._combatSpriteTimeCounter = index;}
    getCombatSpriteTimeCounter(): number {return this._combatSpriteTimeCounter;}
    incrementCombatSpriteTimeCounter(): void {this._combatSpriteTimeCounter += 1;}

    getCardGraphicSetting(){return this._cardGraphicSetting;}

    getFightAnimationMap() : Map<string, CardAnimation> {return this._fightAnimation;}
	addFightAnimation(animation: CardAnimation, uuid: string = UUID.generateUUID()) {this._fightAnimation.set(uuid, animation);}
	resetFigthAnimationMap() : void {this._fightAnimation = new Map();}
}
export default AbstractPrintableCard;