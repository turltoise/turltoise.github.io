var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Combat_instances, _Combat_getCurrentLevelName;
import AdventureSceneGraphicComponent from "../Component/Panel/Combat/AdventureSceneGraphicComponent.js";
import CombatMenuGraphicComponent from "../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import Chat from "./Chat/Chat.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Level from "./Level.js";
import AllWorldProgress from "./State/AllWorldProgress.js";
class Combat {
    constructor(container) {
        _Combat_instances.add(this);
        this._container = container;
        this._combatState = CombatMenuGraphicComponent.getStop();
        this._combatCountDownLevel = 0;
        this._combatStatusText = "";
        this._currentWorld = null;
        this._currentLevel = null;
        const self = this;
        setInterval(() => self.internalLoop(), 1000);
    }
    getCombatState() { return this._combatState; }
    getCombatStatusText() { return this._combatStatusText; }
    getCombatCountDownLevel() { return this._combatCountDownLevel; }
    getCurrentLevel() { return this._currentLevel; }
    setCombatState(combatState) { this._combatState = combatState; }
    setCombatStatusText(combatStatusText) { this._combatStatusText = combatStatusText; }
    setCombatCountDownLevel(combatCountDownLevel) { this._combatCountDownLevel = combatCountDownLevel; }
    setCurrentWorld(currentWorld) { this._currentWorld = currentWorld; }
    getCurrentWorld() { return this._currentWorld; }
    internalLoop() {
        const combatState = this._combatState;
        switch (combatState) {
            case CombatMenuGraphicComponent.getContinue():
                this.continue();
                break;
            case CombatMenuGraphicComponent.getStart():
                this.preStart();
                break;
            case CombatMenuGraphicComponent.getStarting():
                this.starting();
                break;
            case CombatMenuGraphicComponent.getStop():
                this.stop();
                break;
            case CombatMenuGraphicComponent.getNext():
                this.nextLevel();
                break;
            case CombatMenuGraphicComponent.getPrevious():
                this.previousLevel();
                break;
            default:
                break;
        }
    }
    preStart() {
        const allWorldProgress = this._container.get(AllWorldProgress.name);
        const chat = this._container.get(Chat.name);
        this._currentLevel = new Level(this._container, allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()));
        this._currentLevel.prestart(this._currentWorld);
        this._combatCountDownLevel = 2;
        this._combatState = CombatMenuGraphicComponent.getStarting();
        const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._combatCountDownLevel + ".";
        this._combatStatusText = text;
        chat.addChatMessage(text, ChatMessage.COUNT_DOWN());
        this._combatCountDownLevel -= 1;
        const adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
        adventureSceneGraphicComponent.cleanHeroCards();
        adventureSceneGraphicComponent.cleanEnemyCards();
        adventureSceneGraphicComponent.displayHeroCards(this._currentLevel.getHeroListForFight());
        adventureSceneGraphicComponent.displayEnemyCards(this._currentLevel.getEnemyList());
    }
    nextLevel() {
        const allWorldProgress = this._container.get(AllWorldProgress.name);
        const chat = this._container.get(Chat.name);
        if (allWorldProgress.getMaxLevelReachForWorld(this._currentWorld.getName()) + 1 > allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())) {
            allWorldProgress.incrementCurrentLevelForWorld(this._currentWorld.getName());
            this._combatState = CombatMenuGraphicComponent.getStart();
        }
        else {
            chat.addChatMessage("Can't increase above level " + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) + ". You need to win current level first.", ChatMessage.ERROR());
            this._combatState = CombatMenuGraphicComponent.getStop();
        }
    }
    previousLevel() {
        const allWorldProgress = this._container.get(AllWorldProgress.name);
        const chat = this._container.get(Chat.name);
        // if possible
        if (allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) > 1) { // 1 = first level
            // reduce level
            allWorldProgress.reduceCurrentLevelForWorld(this._currentWorld.getName());
            console.debug("Reduce to level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this));
            // start the new level
            this._combatState = CombatMenuGraphicComponent.getStart();
        }
        else {
            chat.addChatMessage("Level can't be reduce", ChatMessage.ERROR());
            this._combatState = CombatMenuGraphicComponent.getStop();
        }
    }
    starting() {
        const chat = this._container.get(Chat.name);
        const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._combatCountDownLevel + ".";
        this._combatStatusText = text;
        chat.addChatMessage(text, ChatMessage.COUNT_DOWN());
        if (this._combatCountDownLevel == 0) {
            this._currentLevel.start();
            // then continue
            this.continue();
        }
        else {
            this._combatCountDownLevel -= 1;
        }
    }
    stop() {
        if (this._currentLevel) {
            this._currentLevel.stop();
            this._combatState = null;
        }
    }
    continue() {
        const allWorldProgress = this._container.get(AllWorldProgress.name);
        const chat = this._container.get(Chat.name);
        // force continue state
        this._combatState = CombatMenuGraphicComponent.getContinue();
        let currentEnemy = this._currentLevel.getCurrentEnemy();
        let currentHero = this._currentLevel.getCurrentHero();
        if (currentEnemy == null) {
            chat.addChatMessage("You win !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " completed !", ChatMessage.SUCCES());
            this._combatState = CombatMenuGraphicComponent.getStop();
            allWorldProgress.setMaxLevelReachForWorld(this._currentWorld.getName(), allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()));
            this._currentLevel = null;
            return;
        }
        if (currentHero == null) {
            chat.addChatMessage("You loose !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + ".", ChatMessage.FAILURE());
            this._combatState = null;
            this._currentLevel = null;
            return;
        }
        this._currentLevel.fight();
    }
}
_Combat_instances = new WeakSet(), _Combat_getCurrentLevelName = function _Combat_getCurrentLevelName() {
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    return this._currentWorld.getName() + "_" + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName());
};
export default Combat;
//# sourceMappingURL=Combat.js.map