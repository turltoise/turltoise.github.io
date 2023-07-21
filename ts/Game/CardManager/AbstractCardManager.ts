import CollectionCard from "../Card/CollectionCard.js";
import UUID from "../Tools/UUID.js";

class AbstractCardManager {
	protected _cardList: Map<string, CollectionCard>;

	constructor() {
		this._cardList = new Map<string, CollectionCard>();
	}

	getCardList(): Map<string, CollectionCard> {
		return this._cardList;
	}

	addCard(card: CollectionCard): void {
		if (this.isCard(card)) {
			this._cardList.set(card.getUUID(), card);
			console.info(card.getUUID() + " added!");
		} else {
			console.warn("addCard : bad constructor type : " + card.constructor.name);
		}
	}

	removeCard(card: CollectionCard): void {
		if (this.isCard(card)) {
			this._cardList.delete(card.getUUID());
			console.info(card.getUUID() + " removed!");
		} else {
			console.warn("removeCard : bad constructor type : " + card.constructor.name);
		}
	}

	removeCardFromUUID(uuid: string): void {
		if (UUID.checkUUID(uuid)) {
			this._cardList.delete(uuid);
			console.info(uuid + " removed!");
		} else {
			console.warn("removeCardFromUUID : bad UUID : " + uuid);
		}
	}

	hasCardFromUUID(uuid: string): boolean {
		if (UUID.checkUUID(uuid)) {
			return this._cardList.has(uuid);
		} else {
			console.warn("cardIsInDeck : bad UUID : " + uuid);
			return false;
		}
	}

	getCardFromUUID(uuid: string): CollectionCard {
		if (UUID.checkUUID(uuid)) {
			return this._cardList.get(uuid);
		} else {
			console.warn("getCardFromUUID : bad UUID : " + uuid);
			return null;
		}
	}

	private isCard(card: CollectionCard): boolean {
		if (card.constructor.name == "Hero" || card.constructor.name == "Enemy" || card.constructor.name == "Item") {
			return true;
		} else {
			return false;
		}
	}
}

export default AbstractCardManager;