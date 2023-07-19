var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Combat_instances, _Combat_fight, _Combat_getCurrentLevelName;
import CombatMenuGraphicComponent from "../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import ChatMessage from "./Chat/ChatMessage.js";
import Level from "./Level.js";
class Combat {
    constructor(state) {
        _Combat_instances.add(this);
        this._state = state;
        this._phase = Combat.PHASE_HERO();
        const self = this;
        setInterval(() => self.internalLoop(), 2000);
    }
    internalLoop() {
        const combatState = this._state.getCombatState();
        switch (combatState) {
            case CombatMenuGraphicComponent.getContinue():
                this.continue();
                break;
            case CombatMenuGraphicComponent.getStart():
                this._state.setLevel(new Level(this._state, this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName())));
                this._state.getLevel().prestart();
                this._state.setCombatCountDownLevel(2);
                this._state.setCombatState(CombatMenuGraphicComponent.getStarting());
                const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._state.getCombatCountDownLevel() + ".";
                this._state.setCombatStatusText(text);
                this._state.addChatMessage(text, ChatMessage.COUNT_DOWN());
                this._state.setCombatCountDownLevel(this._state.getCombatCountDownLevel() - 1);
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
    nextLevel() {
        if (this._state.getAllWorldProgress().getMaxLevelReachForWorld(this._state.getCurrentWorld().getName()) + 1 > this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName())) {
            this._state.getAllWorldProgress().incrementCurrentLevelForWorld(this._state.getCurrentWorld().getName());
            this._state.setCombatState(CombatMenuGraphicComponent.getStart());
        }
        else {
            this._state.addChatMessage("Can't increase above level " + this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName()) + ". You need to win current level first.", ChatMessage.ERROR());
            this._state.setCombatState(CombatMenuGraphicComponent.getStop());
        }
    }
    previousLevel() {
        // if possible
        if (this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName()) > 1) { // 1 = first level
            // reduce level
            this._state.getAllWorldProgress().reduceCurrentLevelForWorld(this._state.getCurrentWorld().getName());
            console.debug("Reduce to level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this));
            // start the new level
            this._state.setCombatState(CombatMenuGraphicComponent.getStart());
        }
        else {
            this._state.addChatMessage("Level can't be reduce", ChatMessage.ERROR());
            this._state.setCombatState(CombatMenuGraphicComponent.getStop());
        }
    }
    starting() {
        const text = "Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " starts in " + this._state.getCombatCountDownLevel() + ".";
        this._state.setCombatStatusText(text);
        this._state.addChatMessage(text, ChatMessage.COUNT_DOWN());
        if (this._state.getCombatCountDownLevel() == 0) {
            this._state.getLevel().start();
            // then continue
            this.continue();
        }
        else {
            this._state.setCombatCountDownLevel(this._state.getCombatCountDownLevel() - 1);
        }
    }
    stop() {
        if (this._state.getLevel()) {
            this._state.getLevel().stop();
            this._state.setCombatState(null);
        }
    }
    continue() {
        // force continue state
        this._state.setCombatState(CombatMenuGraphicComponent.getContinue());
        let currentEnemy = this._state.getLevel().getCurrentEnemy();
        let currentHero = this._state.getLevel().getCurrentHero();
        if (currentEnemy == null) {
            this._state.addChatMessage("You win !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + " completed !", ChatMessage.SUCCES());
            this._state.setCombatState(CombatMenuGraphicComponent.getStop());
            this._state.getAllWorldProgress().setMaxLevelReachForWorld(this._state.getCurrentWorld().getName(), this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName()));
            this._state.setLevel(null);
            return;
        }
        if (currentHero == null) {
            this._state.addChatMessage("You loose !  Level " + __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_getCurrentLevelName).call(this) + ".", ChatMessage.FAILURE());
            this._state.setCombatState(null);
            this._state.setLevel(null);
            return;
        }
        __classPrivateFieldGet(this, _Combat_instances, "m", _Combat_fight).call(this, currentEnemy, currentHero);
    }
    static PHASE_HERO() {
        return "hero";
    }
    static PHASE_ENEMY() {
        return "enemy";
    }
}
_Combat_instances = new WeakSet(), _Combat_fight = function _Combat_fight(currentEnemy, currentHero) {
    if (this._phase == Combat.PHASE_HERO()) {
        this._state.setCombatStatusText("Your turn !");
        //currentHero.hit(currentEnemy, this._state);
        currentHero.triggerStatus();
        currentHero.getRandomCapacity().trigger(currentHero, currentEnemy);
        this._state.getLevel().setNextHero();
        this._phase = Combat.PHASE_ENEMY();
    }
    else if (this._phase == Combat.PHASE_ENEMY()) {
        this._state.setCombatStatusText("Enemy turn !");
        //currentEnemy.hit(currentHero, this._state);
        currentEnemy.triggerStatus();
        currentEnemy.getRandomCapacity().trigger(currentEnemy, currentHero);
        this._phase = Combat.PHASE_HERO();
    }
}, _Combat_getCurrentLevelName = function _Combat_getCurrentLevelName() {
    return this._state.getCurrentWorld().getName() + "_" + this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName());
};
export default Combat;
//# sourceMappingURL=Combat.js.map