import UUID from "../Tools/UUID.js";
class AbstractPrintableCard {
    constructor(title, img, uuid) {
        this._title = title;
        this._img = img;
        this._uuid = uuid;
        this._fightAnimation = new Map();
    }
    getImg() { return this._img; }
    getTitle() { return this._title; }
    getUUID() { return this._uuid; }
    getFightAnimationMap() { return this._fightAnimation; }
    addFightAnimation(animation, uuid = UUID.generateUUID()) { this._fightAnimation.set(uuid, animation); }
    resetFigthAnimationMap() { this._fightAnimation = new Map(); }
}
export default AbstractPrintableCard;
//# sourceMappingURL=AbstractPrintableCard.js.map