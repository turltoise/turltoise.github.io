import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
import UUID from "../Tools/UUID.js";
class Enemy extends CollectionCard {
    constructor(container, rawCarac, levelNumber, title, img, gold = 5, capacities = new Map(), cardGraphicSetting) {
        super(container, rawCarac, levelNumber, title, img, capacities, UUID.generateUUID(), cardGraphicSetting);
        this._gold = gold;
    }
    getStackPlayCard() {
        let playCardList = new Map();
        playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
        return new StackPlayCard(this._container, playCardList, this._cardGraphicSetting);
    }
    getGold() {
        return Math.floor(this._gold * 1.05 ** this._levelNumber);
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map