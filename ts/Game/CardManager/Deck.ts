import Hero from "../Card/Hero.js";
import AbstractCardManager from "./AbstractCardManager.js";

class Deck extends AbstractCardManager {
	private _maxCard: number;

	constructor() {
		super();
		this._maxCard = 5;
	}

	addCard(card: Hero): boolean {
		if (this._cardList.size >= this._maxCard) {
			return false;
		}
		super.addCard(card);
		return true;
	}

	getMaxCard(): number {
		return this._maxCard;
	}

	getCardWithName(name: string): Hero {
		let heroFound: Hero = null;
		this._cardList.forEach((hero: Hero) => {
			if (hero.getTitle() == name) {
				heroFound = hero;
			}
		});
		return heroFound;
	}
}

export default Deck;