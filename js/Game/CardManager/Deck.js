import AbstractCardManager from "./AbstractCardManager.js";
class Deck extends AbstractCardManager {
    constructor() {
        super();
        this._maxCard = 5;
    }
    addCard(card) {
        if (this._cardList.size >= this._maxCard) {
            return false;
        }
        super.addCard(card);
        return true;
    }
    getMaxCard() {
        return this._maxCard;
    }
}
export default Deck;
//# sourceMappingURL=Deck.js.map