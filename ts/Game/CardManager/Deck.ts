import AbstractCardManager from "./AbstractCardManager.js";

class Deck extends AbstractCardManager {
	private _maxCard: number;

	constructor() {
		super();
		this._maxCard = 5;
	}

	addCard(card: any): boolean {
		if (this._cardList.size >= this._maxCard) {
			return false;
		}
		super.addCard(card);
		return true;
	}
	getMaxCard(): number {
		return this._maxCard;
	}
}

export default Deck;