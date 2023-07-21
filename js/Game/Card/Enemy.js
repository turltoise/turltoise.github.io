import StackPlayCard from "./StackPlayCard.js";
import CollectionCard from "./CollectionCard.js";
class Enemy extends CollectionCard {
    constructor(rawCarac, level, title, img, gold = 5, capacities = new Map()) {
        super(rawCarac, level, title, img, capacities);
        this._gold = gold;
    }
    getStackPlayCard() {
        let playCardList = new Map();
        playCardList.set('this', this.getPlayCard());
        return new StackPlayCard(playCardList);
    }
    getGold() {
        return this._gold;
    }
}
export default Enemy;
//# sourceMappingURL=Enemy.js.map