var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Combat_instances, _Combat_isNextLevelAvailable, _Combat_getCurrentLevelName, _Combat_automaticLaunch;
import AdventureSceneGraphicComponent from "../Component/Panel/Combat/AdventureSceneGraphicComponent.js";
import Chat from "./Chat/Chat.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Level from "./Level.js";
import AllWorldProgress from "./State/AllWorldProgress.js";
class Combat {
    constructor(container) {
        _Combat_instances.add(this);
        this._container = container;
        this._combatState = Combat.STATE_STOP();
        this._combatCountDownLevel = 0;
        this._combatStatusText = "";
        this._currentWorld = null;
        this._currentLevel = null;
        this._automaticMode = Combat.AUTOMATIC_MODE_LOOP();
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
    getAutomaticMode() { return this._automaticMode; }
    setAutomaticMode(mode) { this._automaticMode = mode; }
    setCurrentWorld(currentWorld) { this._currentWorld = currentWorld; }
    getCurrentWorld() { return this._currentWorld; }
    getWorldInProgress() {
        if (this._currentLevel) {
            return this._currentWorld.getName();
        }
        return null;
        ;
    }
    internalLoop() {
        const combatState = this._combatState;
        switch (combatState) {
            case Combat.STATE_CONTINUE():
                this.continue();
                break;
            case Combat.STATE_START():
                this.preStart();
                break;
            case Combat.STATE_STARTING():
                this.starting();
                break;
            case Combat.STATE_STOP():
                this.stop();
                break;
            case Combat.STATE_NEXT():
                this.nextLevel();
                break;
            case Combat.STATE_PREVIOUS():
                this.previousLevel();
                break;
            case Combat.STATE_FORFEIT():
                this.forfeitLevel();
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
        this._combatState = Combat.STATE_STARTING();
        const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._combatCountDownLevel + ".";
        this._combatStatusText = text;
        chat.addChatMessage(text, ChatMessage.COMBAT());
        this._combatCountDownLevel -= 1;
        const adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
        adventureSceneGraphicComponent.cleanHeroCards();
        adventureSceneGraphicComponent.cleanEnemyCards();
        adventureSceneGraphicComponent.displayHeroCards(this._currentLevel.getHeroListForFight());
        adventureSceneGraphicComponent.displayEnemyCards(this._currentLevel.getEnemyList());
    }
    forfeitLevel() {
        this.setCombatStatusText("Combat forfeit!");
        let chat = this._container.get(Chat.name);
        this._currentLevel = null;
        this._combatState = null;
        chat.addChatMessage("Level forfeited, you can now choose another world.", ChatMessage.COMBAT());
        const adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
        adventureSceneGraphicComponent.cleanHeroCards();
        adventureSceneGraphicComponent.cleanEnemyCards();
    }
    nextLevel() {
        const allWorldProgress = this._container.get(AllWorldProgress.name);
        const chat = this._container.get(Chat.name);
        if (__classPrivateFieldGet(this, _Combat_instances, "m", _Combat_isNextLevelAvailable).call(this)) {
            allWorldProgress.incrementCurrentLevelForWorld(this._currentWorld.getName());
            this._combatState = Combat.STATE_START();
        }
        else {
            chat.addChatMessage("Can't increase above level " + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()) + ". You need to win current level first.", ChatMessage.COMBAT());
            this._combatState = Combat.STATE_STOP();
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
            this._combatState = Combat.STATE_START();
        }
        else {
            chat.addChatMessage("Level can't be reduce", ChatMessage.COMBAT());
            this._combatState = Combat.STATE_STOP();
        }
    }
    starting() {
        const chat = this._container.get(Chat.name);
        const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._combatCountDownLevel + ".";
        this._combatStatusText = text;
        chat.addChatMessage(text, ChatMessage.COMBAT());
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
        this._combatState = Combat.STATE_CONTINUE();
        let currentEnemy = this._currentLevel.getCurrentEnemy();
        let currentHero = this._currentLevel.getCurrentHero();
        if (currentEnemy == null) {
            chat.addChatMessage("You win !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " completed !", ChatMessage.COMBAT());
            this._combatState = null;
            allWorldProgress.setMaxLevelReachForWorld(this._currentWorld.getName(), allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName()));
            this._currentLevel = null;
            this.setCombatStatusText("You won!");
            const adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
            adventureSceneGraphicComponent.cleanHeroCards();
            adventureSceneGraphicComponent.cleanEnemyCards();
            __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_automaticLaunch).call(this);
            return;
        }
        if (currentHero == null) {
            chat.addChatMessage("You loose !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + ".", ChatMessage.COMBAT());
            this._combatState = null;
            this._currentLevel = null;
            this.setCombatStatusText("You lost!");
            const adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
            adventureSceneGraphicComponent.cleanHeroCards();
            adventureSceneGraphicComponent.cleanEnemyCards();
            __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_automaticLaunch).call(this);
            return;
        }
        this._currentLevel.fight();
    }
    static STATE_START() { return "START"; }
    // after start
    static STATE_STARTING() { return "STARTING"; }
    static STATE_STOP() { return "STOP"; }
    static STATE_PREVIOUS() { return "PREVIOUS"; }
    static STATE_NEXT() { return "NEXT"; }
    static STATE_CONTINUE() { return "CONTINUE"; }
    static STATE_FORFEIT() { return "FORFEIT"; }
    static AUTOMATIC_MODE_LOOP() { return "LOOP"; }
    static AUTOMATIC_MODE_INCREMENT() { return "INCREMENT"; }
}
_Combat_instances = new WeakSet(), _Combat_isNextLevelAvailable = function _Combat_isNextLevelAvailable() {
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    if (allWorldProgress.getMaxLevelReachForWorld(this._currentWorld.getName()) + 1 > allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName())) {
        return true;
    }
    else {
        return false;
    }
}, _Combat_getCurrentLevelName = function _Combat_getCurrentLevelName() {
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    return this._currentWorld.getName() + "_" + allWorldProgress.getCurrentLevelForWorld(this._currentWorld.getName());
}, _Combat_automaticLaunch = function _Combat_automaticLaunch() {
    if (this._automaticMode == Combat.AUTOMATIC_MODE_INCREMENT() && __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_isNextLevelAvailable).call(this)) {
        this.nextLevel();
    }
    else {
        this._combatState = Combat.STATE_START();
    }
};
export default Combat;
//# sourceMappingURL=Combat.js.map