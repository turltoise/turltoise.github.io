import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
class Enemy extends CollectionCard {
    constructor(container, rawCarac, levelNumber, title, img, gold = 5, capacities = new Map()) {
        super(container, rawCarac, levelNumber, title, img, capacities);
        this._gold = gold;
    }
    getStackPlayCard() {
        let playCardList = new Map();
        playCardList.set(StackPlayCard.MAIN_KEY(), this.getPlayCard());
        return new StackPlayCard(this._container, playCardList);
    }
    getGold() {
        return Math.floor(this._gold * 1.05 ** this._levelNumber);
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map