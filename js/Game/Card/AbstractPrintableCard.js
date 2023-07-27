import UUID from "../Tools/UUID.js";
class AbstractPrintableCard {
    constructor(container, title, img, uuid, cardGraphicSetting) {
        this._container = container;
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
        this._cinematicText = null;
        this._cardGraphicSetting = cardGraphicSetting;
    }
    getImg() { return this._img; }
    getTitle() { return this._title; }
    getUUID() { return this._uuid; }
    getCurrentLife() { return 0; }
    getMaxLife() { return 0; }
    isYours() { return null; }
    setCinematicText(text) { this._cinematicText = text; }
    getCinematicText() { return this._cinematicText; }
    getCardGraphicSetting() { return this._cardGraphicSetting; }
    getFightAnimationMap() { return this._fightAnimation; }
    addFightAnimation(animation, uuid = UUID.generateUUID()) { this._fightAnimation.set(uuid, animation); }
    resetFigthAnimationMap() { this._fightAnimation = new Map(); }
}
export default AbstractPrintableCard;
//# sourceMappingURL=AbstractPrintableCard.js.map