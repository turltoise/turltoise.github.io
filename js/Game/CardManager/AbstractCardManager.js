import UUID from "../Tools/UUID.js";
class AbstractCardManager {
    constructor() {
        this._cardList = new Map();
    }
    getCardList() {
        return this._cardList;
    }
    addCard(card) {
        if (this.isCard(card)) {
            this._cardList.set(card.getUUID(), card);
            console.info(card.getUUID() + " added!");
        }
        else {
            console.warn("addCard : bad constructor type : " + card.constructor.name);
        }
    }
    removeCard(card) {
        if (this.isCard(card)) {
            this._cardList.delete(card.getUUID());
            console.info(card.getUUID() + " removed!");
        }
        else {
            console.warn("removeCard : bad constructor type : " + card.constructor.name);
        }
    }
    removeCardFromUUID(uuid) {
        if (UUID.checkUUID(uuid)) {
            this._cardList.delete(uuid);
            console.info(uuid + " removed!");
        }
        else {
            console.warn("removeCardFromUUID : bad UUID : " + uuid);
        }
    }
    hasCardFromUUID(uuid) {
        if (UUID.checkUUID(uuid)) {
            return this._cardList.has(uuid);
        }
        else {
            console.warn("cardIsInDeck : bad UUID : " + uuid);
            return false;
        }
    }
    getCardFromUUID(uuid) {
        if (UUID.checkUUID(uuid)) {
            return this._cardList.get(uuid);
        }
        else {
            console.warn("getCardFromUUID : bad UUID : " + uuid);
            return null;
        }
    }
    isCard(card) {
        if (card.constructor.name == "Hero" || card.constructor.name == "Enemy" || card.constructor.name == "Item") {
            return true;
        }
        else {
            return false;
        }
    }
}
export default AbstractCardManager;
//# sourceMappingURL=AbstractCardManager.js.map