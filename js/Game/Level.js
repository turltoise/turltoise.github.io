var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Level_instances, _Level_action, _Level_generateEnemyList, _Level_generateHeroListForFight, _Level_getNextEnemy, _Level_setNextEnemy, _Level_isLastEnemyAlreadyDefeated, _Level_getNextAliveHero, _Level_isLastHero, _Level_resetIdHero, _Level_incrementIdHero;
// To set the level at the beginning of the fight
import ChatMessage from "./Chat/ChatMessage.js";
import Chat from "./Chat/Chat.js";
import Deck from "./CardManager/Deck.js";
import Combat from "./Combat.js";
class Level {
    constructor(container, levelNumber) {
        _Level_instances.add(this);
        this._container = container;
        this._levelNumber = levelNumber;
        this._enemyList = new Map();
        this._heroListForFight = new Map();
        this._currentPositionOfEnemyInList = Level.ZERO();
        this._currentPositionOfHeroInList = Level.ZERO();
        this._phase = Level.PHASE_HERO();
    }
    getHeroListForFight() { return this._heroListForFight; }
    getEnemyList() { return this._enemyList; }
    fight() {
        const combat = this._container.get(Combat.name);
        let currentHero = this.getCurrentHero();
        let currentEnemy = this.getCurrentEnemy();
        if (this._phase == Level.PHASE_HERO()) {
            combat.setCombatStatusText("Your turn !");
            __classPrivateFieldGet(this, _Level_instances, "m", _Level_action).call(this, currentHero, currentEnemy);
            this._phase = Level.PHASE_ENEMY();
            this.setNextHero();
        }
        else if (this._phase == Level.PHASE_ENEMY()) {
            combat.setCombatStatusText("Enemy turn !");
            __classPrivateFieldGet(this, _Level_instances, "m", _Level_action).call(this, currentEnemy, currentHero);
            this._phase = Level.PHASE_HERO();
        }
    }
    /**
    hit(card, state) {
        state.addChatMessage(this._title + " hits " + card._title + " for " + this._currentStrength + ".", ChatMessage.SWORD());
        console.debug(card._currentLife + "/" + card._life);
        card._currentLife = parseInt(card._currentLife) - parseInt(this._currentStrength);
        console.debug(card._currentLife + "/" + card._life);

        this._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.ATTACK()));

        card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DAMAGE(), "-"+this._currentStrength));
        if (card._currentLife <= 0) {
            state.addChatMessage(card._title + " dies!", ChatMessage.DIES());
            card._animation.set(UUID.generateUUID(), new CardAnimation(CardAnimation.DIE()));
            if (card._type == Card.ENEMY_TYPE()) {
                state._resource._gold = state._resource._gold + card._gold;
                state.addChatMessage(card._gold + " gold earned.", ChatMessage.GOLD());
            }
        }
    }
**/
    prestart(currentWorld) {
        __classPrivateFieldGet(this, _Level_instances, "m", _Level_generateHeroListForFight).call(this);
        __classPrivateFieldGet(this, _Level_instances, "m", _Level_generateEnemyList).call(this, currentWorld);
    }
    start() {
        const chat = this._container.get(Chat.name);
        chat.addChatMessage("Starting level " + this._levelNumber, ChatMessage.LEVEL_START());
    }
    stop() {
        const chat = this._container.get(Chat.name);
        chat.addChatMessage("Stopping level " + this._levelNumber, ChatMessage.LEVEL_STOP());
        this._enemyList = new Map();
        this._heroListForFight = new Map();
    }
    getCurrentEnemy() {
        const currentEnemy = this._enemyList.get(this._currentPositionOfEnemyInList.toString());
        if (currentEnemy) {
            return (currentEnemy.isAlive()) ? currentEnemy : __classPrivateFieldGet(this, _Level_instances, "m", _Level_getNextEnemy).call(this);
        }
        else {
            return null;
        }
    }
    getCurrentHero() {
        const currentPositionOfHeroInList = this._heroListForFight.get(this._currentPositionOfHeroInList.toString());
        return (currentPositionOfHeroInList.isAlive()) ? currentPositionOfHeroInList : __classPrivateFieldGet(this, _Level_instances, "m", _Level_getNextAliveHero).call(this);
    }
    setNextHero() {
        return __classPrivateFieldGet(this, _Level_instances, "m", _Level_getNextAliveHero).call(this);
    }
    static ZERO() {
        return 0;
    }
    static PHASE_HERO() {
        return "hero";
    }
    static PHASE_ENEMY() {
        return "enemy";
    }
}
_Level_instances = new WeakSet(), _Level_action = function _Level_action(thrower, target) {
    thrower.triggerStatus();
    thrower.playCapacity(this._container, target);
    /*capacity.trigger(thrower, target);
    thrower.addFightAnimation(new CardAnimation(CardAnimation.ATTACK()));
    target.addFightAnimation(new CardAnimation(CardAnimation.DAMAGE(), "4"));*/
}, _Level_generateEnemyList = function _Level_generateEnemyList(currentWorld) {
    let idListCard = Level.ZERO();
    const currentLevel = currentWorld.getWorlLeveldByNumber(this._levelNumber);
    currentLevel.getMonsterList().forEach((enemy, uuid) => {
        this._enemyList.set(idListCard.toString(), enemy.getStackPlayCard());
        idListCard++;
    });
}, _Level_generateHeroListForFight = function _Level_generateHeroListForFight() {
    let idListCard = Level.ZERO();
    const deck = this._container.get(Deck.name);
    deck.getCardList().forEach((hero, uuid) => {
        this._heroListForFight.set(idListCard.toString(), hero.getStackPlayCard());
        idListCard++;
    });
}, _Level_getNextEnemy = function _Level_getNextEnemy() {
    __classPrivateFieldGet(this, _Level_instances, "m", _Level_setNextEnemy).call(this);
    return (__classPrivateFieldGet(this, _Level_instances, "m", _Level_isLastEnemyAlreadyDefeated).call(this)) ? null : this._enemyList.get(this._currentPositionOfEnemyInList.toString());
}, _Level_setNextEnemy = function _Level_setNextEnemy() {
    this._currentPositionOfEnemyInList = this._currentPositionOfEnemyInList + 1;
}, _Level_isLastEnemyAlreadyDefeated = function _Level_isLastEnemyAlreadyDefeated() {
    return (this._enemyList.size > this._currentPositionOfEnemyInList) ? false : true;
}, _Level_getNextAliveHero = function _Level_getNextAliveHero() {
    (__classPrivateFieldGet(this, _Level_instances, "m", _Level_isLastHero).call(this)) ? __classPrivateFieldGet(this, _Level_instances, "m", _Level_resetIdHero).call(this) : __classPrivateFieldGet(this, _Level_instances, "m", _Level_incrementIdHero).call(this);
    // start with right part of Map
    for (let i = this._currentPositionOfHeroInList; i < this._heroListForFight.size; i++) {
        if (this._heroListForFight.get(i.toString()).isAlive()) {
            this._currentPositionOfHeroInList = i;
            return this._heroListForFight.get(i.toString());
        }
    }
    // continue with the left part of Map
    for (let i = Level.ZERO(); i < this._currentPositionOfHeroInList; i++) {
        if (this._heroListForFight.get(i.toString()).isAlive()) {
            this._currentPositionOfHeroInList = i;
            return this._heroListForFight.get(i.toString());
        }
    }
    return null;
}, _Level_isLastHero = function _Level_isLastHero() {
    return (this._currentPositionOfHeroInList == this._heroListForFight.size - 1) ? true : false;
}, _Level_resetIdHero = function _Level_resetIdHero() {
    return this._currentPositionOfHeroInList = Level.ZERO();
}, _Level_incrementIdHero = function _Level_incrementIdHero() {
    return this._currentPositionOfHeroInList = this._currentPositionOfHeroInList + 1;
};
export default Level;
//# sourceMappingURL=Level.js.map