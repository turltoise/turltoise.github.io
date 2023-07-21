import CombatMenuGraphicComponent from "../../Component/Panel/Combat/CombatMenuGraphicComponent.js";
import AbstractClass from "../AbstractClass.js";
import Chat from "../Chat/Chat.js";
import AllWorldProgress from "./AllWorldProgress.js";
class State extends AbstractClass {
    //private _currentScript: HTMLOrSVGScriptElement;
    constructor(documentArg, collection, deck, resource, worldList) {
        super();
        this._collection = collection;
        this._deck = deck;
        this._resource = resource;
        this._worldList = worldList;
        // WorldProgress
        this._allWorldProgress = new AllWorldProgress();
        this._currentWorld = null;
        this._document = documentArg;
        // combat
        this._combatState = CombatMenuGraphicComponent.getStop();
        this._combatCountDownLevel = 0;
        this._combatStatusText = "";
        this._level = null;
        this._chat = new Chat();
        this._debug = true;
    }
    getCombatState() { return this._combatState; }
    setCombatState(combatState) { this._combatState = combatState; }
    getCombatCountDownLevel() { return this._combatCountDownLevel; }
    setCombatCountDownLevel(combatCountDownLevel) { this._combatCountDownLevel = combatCountDownLevel; }
    getCombatStatusText() { return this._combatStatusText; }
    setCombatStatusText(combatStatusText) { return this._combatStatusText = combatStatusText; }
    getLevel() { return this._level; }
    setLevel(level) { this._level = level; }
    getAllWorldProgress() { return this._allWorldProgress; }
    getChat() { return this._chat; }
    getResource() { return this._resource; }
    getCollection() { return this._collection; }
    getDeck() { return this._deck; }
    getWorldList() { return this._worldList; }
    getCurrentWorld() { return this._currentWorld; }
    setCurrentWorld(currentWorld) { this._currentWorld = currentWorld; }
    getCardDeckList() { return this._deck.getCardList(); }
    addChatMessage(text, type = null) { this._chat.addChatMessage(text, type); }
    getCurrentEnemy() { return (this._level) ? this._level.getCurrentEnemy() : null; }
    getDebug() {
        return this._debug;
    }
}
export default State;
//# sourceMappingURL=State.js.map