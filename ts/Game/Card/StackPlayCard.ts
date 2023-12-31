import SpriteManager from '../../Component/Card/SpriteManager.js';
import Container from '../../Container.js';
import Chat from '../Chat/Chat.js';
import ChatMessage from '../Chat/ChatMessage.js';
import AbstractCapacity from '../Fight/Capacity/List/AbstractCapacity.js';
import PhysicalAttack from '../Fight/Capacity/List/PhysicalAttack.js';
import Status from '../Fight/Status/Status.js';
import Resource from '../Resource.js';
import UUID from '../Tools/UUID.js';
import AbstractPrintableCard from './AbstractPrintableCard.js';
import CardAnimation from './CardAnimation.js';
import CardGraphicSetting from './CardGraphicSetting.js';
import Hero from './Hero.js';
import PlayCard from './PlayCard.js';

class StackPlayCard extends AbstractPrintableCard {
	private _sMap: Map<string, PlayCard>;
	private _statusList: Map<string, Status>;
	private _currentLife: number;
	private _currentShield: number;

	constructor(
		container:Container,
		playCardMap: Map<string,PlayCard>,
		cardGraphicSetting: CardGraphicSetting
	) {
		super(
			container,
			playCardMap.get(StackPlayCard.MAIN_KEY()).getTitle(),
			playCardMap.get(StackPlayCard.MAIN_KEY()).getImg(),
			playCardMap.get(StackPlayCard.MAIN_KEY()).getUUID(),
			cardGraphicSetting,
			playCardMap.get(StackPlayCard.MAIN_KEY()).getLevel()
		);
		this._sMap = playCardMap;
		this._statusList = new Map<string, Status>();
		this._currentLife = this.getLife();
		this._currentShield = 0;
		
	}

	addCurrentLife(addLife: number): void {
		this._currentLife += addLife;
		this._currentLife = (this._currentLife > this.getLife()) ? this.getLife() : this._currentLife;
	}
	removeCurrentLife(removeLife: number): void {
		this._currentLife -= removeLife;
		this._currentLife = (this._currentLife < 0) ? 0 : this._currentLife;
	}

	getCurrentLife(): number {return this._currentLife;}
	getMaxLife(): number {return this.getLife()}
	getMainPlayCard() : PlayCard {return this._sMap.get(StackPlayCard.MAIN_KEY());}
	isYours(): boolean {
		return (this.getMainPlayCard().getCollectionCard() instanceof Hero) ? true : false;
	}

	isAlive(): boolean {
		return (this._currentLife > 0) ? true : false;
	}

	heal(heal: number): void {
		this.addCurrentLife(heal);
		this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '+ ' + heal.toString(), '#43a047'));
	}

	shield(shield: number): void {
		this._currentShield += shield;
		this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '+ ' + shield.toString(), '#2196f3'));
	}

	dmg(dmg: number): void {
		if (this._currentShield > 0) {
			let leftShield = this._currentShield - dmg;
			let leftDmg = dmg - this._currentShield;
			if (leftShield > 0) {
				this._currentShield = leftShield;
			} else {
				dmg = leftDmg;
			}
		}
		this.removeCurrentLife(dmg);
		this.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), '- ' + dmg.toString(), '#b71c1c'));
		if (this._currentLife <= 0) { 
			this.setCombatSpriteText(SpriteManager.IMG_DIE1());
			if (!this.isYours()) {
				let resource: Resource = this._container.get(Resource.name);
				let goldEarned: number = this.getMainPlayCard().getCollectionCard().getGold()
				resource.addGold(goldEarned);
				let chat: Chat = this._container.get(Chat.name);
				chat.addChatMessage(
					"You earn <font class='message-earn-gold'>" + goldEarned + " golds</font>.",
					ChatMessage.COMBAT()
				);
			}
		} else {
			this.setCombatSpriteText(SpriteManager.IMG_HIT1());
		}
	}

	addStatus(status: Status): void {
		this._statusList.set(UUID.generateUUID(), status);
	}

	triggerStatus(): void {
		this._statusList.forEach((status: Status, id) => {
			if (status.getTick()) {
				status.getTick().tick();
			}
			status.setTurn(status.getTurn()-1);
			if (status.getTurn() <= 0) {
				this._statusList.delete(id);
			}
		});
	}

	getStrength(): number 		{return this.#computeStat('getStrength');}
	getDexterity(): number 		{return this.#computeStat('getDexterity');}
	getIntelligence(): number 	{return this.#computeStat('getIntelligence');}
	getLuck(): number 			{return this.#computeStat('getLuck');}

	getPhysicalDamage(): number 		{return this.#computeStat('getPhysicalDamage');}
	getPhysicalCriticalRate(): number 	{return this.#computeStat('getPhysicalCriticalRate');}
	getPhysicalCriticalNumber(): number {return this.#computeStat('getPhysicalCriticalNumber');}

	getMagicDamage(): number 			{return this.#computeStat('getMagicDamage');}
	getMagicCriticalRate(): number 		{return this.#computeStat('getMagicCriticalRate');}
	getMagicCriticalNumber(): number 	{return this.#computeStat('getMagicCriticalNumber');}

	getFireResistance(): number 		{return this.#computeStat('getFireResistance');}
	getWaterResistance(): number 		{return this.#computeStat('getWaterResistance');}
	getPlantResistance(): number 		{return this.#computeStat('getPlantResistance');}
	getNecromancyResistance(): number 	{return this.#computeStat('getNecromancyResistance');}
	getBlessingResistance(): number 	{return this.#computeStat('getBlessingResistance');}
	getArmor(): number 					{return this.#computeStat('getArmor');}

	getAccuracy(): number 				{return this.#computeStat('getAccuracy');}
	getEscape(): number 				{return this.#computeStat('getEscape');}

	getLife(): number 					{return this.#computeStat('getLife');}

	getCapacities(): Map<string, AbstractCapacity> {
		let capacities = <Map<string, AbstractCapacity>> new Map();
		this._sMap.forEach((computedCard: PlayCard) => {
			capacities = new Map([...capacities, ...computedCard.getCapacities()]);;
		});
		return capacities;
	}

	playCapacity(container: Container,  target: StackPlayCard) {
		let capacity: AbstractCapacity = this.#getRandomCapacity(container);
		capacity.trigger(this, target);
		this.addFightAnimation(new CardAnimation(CardAnimation.ATTACK()));
		this.setCombatSpriteText(SpriteManager.IMG_ATTACK1());
	}

	#getRandomCapacity(container: Container): AbstractCapacity {
		let capacities = <Map<string, AbstractCapacity>> new Map();
		this._sMap.forEach((computedCard: PlayCard) => {
			capacities = new Map([...capacities, ...computedCard.getCapacities()]);;
		});
		let keys = Array.from(capacities.keys());
		let capacity: AbstractCapacity = capacities.get(keys[Math.floor(Math.random() * keys.length)]);
		
		if (!capacity) {capacity = new PhysicalAttack(container);}
		return capacity;
	}

	#computeStat(methodName: string): number {
		return this.#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName) + this.#checkBuffForCarac(methodName);
	}

	#aggregatedStatOfAllSoloCardLinkToThisAggregateCard(methodName: string): number {
		let stat = 0;
		this._sMap.forEach((computedCard: PlayCard) => {
			stat+=computedCard[methodName]();
		});
		return stat;
	}

	#checkBuffForCarac(methodName) {
		let stat = 0;
		this._statusList.forEach((status: Status) => {
			if (typeof status.getBuff()[methodName] !== "undefined") { 
				stat+=status.getBuff()[methodName]();
			}
		});
		return stat;
	}

	static MAIN_KEY(): string {return 'this';}
}
export default StackPlayCard;