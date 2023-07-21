class Element {
	
	static FIRE() {return "fire"};
	static WATER() {return "water"};
	static PLANT() {return "plant"};
	static NECROMANCY() {return "necromancy"};
	static BLESSING() {return "blessing"};
	static NORMAL() {return "normal"};

	getNaturalResistance(attack: string, defend: string): number {
		switch(attack) {
			case(Element.FIRE()):
				switch(defend) {
					case(Element.WATER()):
						return 10;
					case(Element.PLANT()):
						return -10;
					default:
						return 0;
				}
			case(Element.WATER()):
				switch(defend) {
					case(Element.FIRE()):
						return -10;
					case(Element.PLANT()):
						return 10;
				}
			case(Element.PLANT()):
				switch(defend) {
					case(Element.FIRE()):
						return -10;
					case(Element.WATER()):
						return 10;
					default:
						return 0;
				}
			case(Element.NECROMANCY()):
				switch(defend) {
					case(Element.NECROMANCY()):
						return -10;
					default:
						return 0;
				}
			case(Element.BLESSING()):
				switch(defend) {
					case(Element.BLESSING()):
						return 10;
					default:
						return 0;
				}
			default:
				return 0;
		}
	}
}

export default Element;