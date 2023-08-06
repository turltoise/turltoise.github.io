import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
import UUID from "../Tools/UUID.js";
class Hero extends CollectionCard {
    constructor(container, rawCarac, level, title, img, capacities = new Map(), cardGraphicSetting) {
        super(container, rawCarac, level, title, img, capacities, UUID.generateUUID(), cardGraphicSetting);
        this._itemList = new Map();
        this._currentXP = 0;
    }
    static getMaxItem() { return 3; }
    getXP() { return this._currentXP; }
    getXPForNextLevel() { return this._level + 1; }
    addItem(item) {
        item = item;
        this._itemList.set(item.getUUID(), item);
    }
    removeItemWithUUID(uuid) { return this._itemList.delete(uuid); }
    getItemWithUUID(uuid) { return this._itemList.get(uuid); }
    getItemMap() { return this._itemList; }
    getStackPlayCard() {
        let playCardList = new Map();
        this._itemList.forEach((item) => {
            playCardList.set(item.getUUID(), item.getPlayCard());
        });
        playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
        return new StackPlayCard(this._container, playCardList, this._cardGraphicSetting);
    }
}
export default Hero;
//# sourceMappingURL=Hero.js.map