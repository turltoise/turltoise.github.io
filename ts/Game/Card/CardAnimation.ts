class CardAnimation {
	private _type: string;
	private _data1?: string;
	private _data2?: string;
	private _data3?: string;

	constructor(type :string, data1?: string, data2?: string, data3?: string) {
		this.#isTypeExists(type);
		this._type=type;
		this._data1=data1;
		this._data2=data2;
		this._data3=data3;
	}

	#isTypeExists(type: string): boolean {
		const exists = ([
			CardAnimation.ATTACK(),
			CardAnimation.DIE(),
			CardAnimation.DAMAGE()
		].includes(type)) ? true : false;

		(exists) ? "" : console.warn("Type "+ type +" doesn't exist");

		return exists;
	}

	isAttacking(): boolean {return (this._type==CardAnimation.ATTACK());}
	isTakingDamage(): boolean {return (this._type==CardAnimation.DAMAGE());}
	isDying(): boolean {return (this._type==CardAnimation.DIE());}

	static ATTACK(): string {return "attack";}
	static DIE():  string {return "die";}
	static DAMAGE(): string {return "damage";}
}
export default CardAnimation;
