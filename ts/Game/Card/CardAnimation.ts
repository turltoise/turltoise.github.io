class CardAnimation {
	private _type: string;
	private _data1?: string;
	private _data2?: string;
	private _data3?: string;

	constructor(type :string, data1=null, data2=null, data3=null) {
		this.#isTypeExists(type);
		this._type=type;
		this._data1=data1;
		this._data2=data2;
		this._data3=data3;
	}

	#isTypeExists(type) {
		const exists = ([
			CardAnimation.ATTACK(),
			CardAnimation.DIE(),
			CardAnimation.DAMAGE()
		].includes(type)) ? true : false;

		(exists) ? "" : console.warn("Type "+ type +" doesn't exist");

		return exists;
	}

	isAttacking() {
		return (this._type==CardAnimation.ATTACK());
	}

	isTakingDamage() {
		return (this._type==CardAnimation.DAMAGE());
	}

	isDying() {
		return (this._type==CardAnimation.DIE());
	}

	static ATTACK() {
		return "attack";
	}

	static DIE() {
		return "die";
	}

	static DAMAGE() {
		return "damage";
	}
}

export default CardAnimation;
