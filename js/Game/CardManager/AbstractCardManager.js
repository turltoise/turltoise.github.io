import UUID from "../Tools/UUID.js";
class AbstractCardManager {
    constructor() {
        this._cardList = new Map();
    }
    getFirst() {
        return this._cardList.values().next().value;
    }
    getCardList() {
        return this._cardList;
    }
    addCard(card) {
        this._cardList.set(card.getUUID(), card);
        console.info(card.getUUID() + " added!");
    }
    removeCard(card) {
        this._cardList.delete(card.getUUID());
        console.info(card.getUUID() + " removed!");
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
}
export default AbstractCardManager;
//# sourceMappingURL=AbstractCardManager.js.map