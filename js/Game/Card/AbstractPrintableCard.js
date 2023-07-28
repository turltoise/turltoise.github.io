import UUID from "../Tools/UUID.js";
class AbstractPrintableCard {
    constructor(container, title, img, uuid, cardGraphicSetting) {
        this._container = container;
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
        this._combatSpriteText = null;
        this._cardGraphicSetting = cardGraphicSetting;
    }
    getImg() { return this._img; }
    getTitle() { return this._title; }
    getUUID() { return this._uuid; }
    getCurrentLife() { return 0; }
    getMaxLife() { return 0; }
    isYours() { return null; }
    setCombatSpriteText(text) { this._combatSpriteText = text; }
    getCombatSpriteText() { return this._combatSpriteText; }
    resetCombatSpriteIndex() { this._combatSpriteIndex = -1; }
    setCombatSpriteIndex(index) { this._combatSpriteIndex = index; }
    getCombatSpriteIndex() { return this._combatSpriteIndex; }
    incrementCombatSpriteIndex() { this._combatSpriteIndex += 1; }
    resetCombatSpriteTimeCounter() { this._combatSpriteTimeCounter = -1; }
    setCombatSpriteTimeCounter(index) { this._combatSpriteTimeCounter = index; }
    getCombatSpriteTimeCounter() { return this._combatSpriteTimeCounter; }
    incrementCombatSpriteTimeCounter() { this._combatSpriteTimeCounter += 1; }
    getCardGraphicSetting() { return this._cardGraphicSetting; }
    getFightAnimationMap() { return this._fightAnimation; }
    addFightAnimation(animation, uuid = UUID.generateUUID()) { this._fightAnimation.set(uuid, animation); }
    resetFigthAnimationMap() { this._fightAnimation = new Map(); }
}
export default AbstractPrintableCard;
//# sourceMappingURL=AbstractPrintableCard.js.map