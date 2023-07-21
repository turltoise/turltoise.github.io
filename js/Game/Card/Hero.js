import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
import UUID from "../Tools/UUID.js";
class Hero extends CollectionCard {
    constructor(rawCarac, level, title, img, capacities = new Map()) {
        super(rawCarac, level, title, img, capacities);
        this._itemList = new Map();
    }
    addItem(item) {
        item = item;
        this._itemList.set(UUID.generateUUID(), item);
    }
    removeItemWithUUID(uuid) {
        return this._itemList.delete(uuid);
    }
    getItemWithUUID(uuid) {
        return this._itemList.get(uuid);
    }
    getItemMap() {
        return this._itemList;
    }
    getStackPlayCard() {
        let playCardList = new Map();
        this._itemList.forEach((item) => {
            playCardList.set(item.getUUID(), item.getPlayCard());
        });
        playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
        return new StackPlayCard(playCardList);
    }
}
export default Hero;
//# sourceMappingURL=Hero.js.map