var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Level_instances, _Level_generateEnemyList, _Level_generateHeroListForFight, _Level_getNextEnemy, _Level_setNextEnemy, _Level_isLastEnemyAlreadyDefeated, _Level_getNextAliveHero, _Level_isLastHero, _Level_resetIdHero, _Level_incrementIdHero;
import ChatMessage from "./Chat/ChatMessage.js";
class Level {
    constructor(state, levelNumber) {
        _Level_instances.add(this);
        this._state = state;
        this._levelNumber = levelNumber;
        this._enemyList = new Map();
        this._heroListForFight = new Map();
        this._currentPositionOfEnemyInList = Level.ZERO();
        this._currentPositionOfHeroInList = Level.ZERO();
    }
    prestart() {
        __classPrivateFieldGet(this, _Level_instances, "m", _Level_generateHeroListForFight).call(this);
        __classPrivateFieldGet(this, _Level_instances, "m", _Level_generateEnemyList).call(this);
    }
    start() {
        this._state.addChatMessage("Starting level " + this._levelNumber, ChatMessage.LEVEL_START());
    }
    stop() {
        this._state.addChatMessage("Stopping level " + this._levelNumber, ChatMessage.LEVEL_STOP());
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
}
_Level_instances = new WeakSet(), _Level_generateEnemyList = function _Level_generateEnemyList() {
    let idListCard = Level.ZERO();
    const currentLevel = this._state.getCurrentWorld().getWorlLeveldByNumber(this._levelNumber);
    currentLevel.getMonsterList().forEach((enemy, uuid) => {
        this._enemyList.set(idListCard.toString(), enemy.getObjecForFight());
        idListCard++;
    });
}, _Level_generateHeroListForFight = function _Level_generateHeroListForFight() {
    let idListCard = Level.ZERO();
    this._state.getCardDeckList().forEach((hero, uuid) => {
        this._heroListForFight.set(idListCard.toString(), hero.getObjecForFight());
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