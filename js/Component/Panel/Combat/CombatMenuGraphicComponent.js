var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CombatMenuGraphicComponent_instances, _CombatMenuGraphicComponent_displayBtnText, _CombatMenuGraphicComponent_setAnimationBtn, _CombatMenuGraphicComponent_setBackgroundImage, _CombatMenuGraphicComponent_updateTextStatus, _CombatMenuGraphicComponent_updateLevelText, _CombatMenuGraphicComponent_getCurrentLevelName, _CombatMenuGraphicComponent_getMaxLevelReachName;
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import Combat from "../../../Game/Combat.js";
import AllWorldProgress from "../../../Game/State/AllWorldProgress.js";
import F from "../../../Game/Tools/F.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import AdventureSceneGraphicComponent from "./AdventureSceneGraphicComponent.js";
class CombatMenuGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        _CombatMenuGraphicComponent_instances.add(this);
        this._adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
        let style = `
        @keyframes clickAutomaticMode {
            0%   {
                box-shadow: 2px 4px #222;
                background-color: white;
                transform: translate(0, 0);
            }
            100%  {
                box-shadow: 0px 0px #222;
                background-color: black;
                transform: translate(2px, 4px);
            }
        }`;
        let templateStyle = this.getCurrentDocument().createElement('style');
        templateStyle.innerHTML = style;
        this._instanceContainer.appendChild(templateStyle);
        const templateBtn = this.getCurrentDocument().createElement('div');
        templateBtn.setAttribute('class', this.getClassName('btn'));
        templateBtn.style.cursor = "pointer";
        templateBtn.style.display = "inline-block";
        templateBtn.style.margin = "5px";
        templateBtn.style.padding = "5px";
        templateBtn.style.backgroundColor = "#CCDDCC";
        templateBtn.style.caretColor = "transparent";
        templateBtn.style.borderRadius = "3px";
        const instanceLevelText = this.getCurrentDocument().createElement('div');
        instanceLevelText.style.fontSize = "18px";
        instanceLevelText.style.display = "inline-block";
        instanceLevelText.style.marginRight = "20px";
        instanceLevelText.setAttribute('id', 'level-text');
        instanceLevelText.style.backgroundColor = "rgba(255,255,255,0.8)";
        instanceLevelText.style.padding = "5px";
        this._instanceContainer.appendChild(instanceLevelText);
        const instanceStatusCombat = this.getCurrentDocument().createElement('div');
        instanceStatusCombat.innerHTML = "";
        instanceStatusCombat.style.fontWeight = "bold";
        instanceStatusCombat.style.marginLeft = "10px";
        instanceStatusCombat.style.display = "inline-block";
        instanceStatusCombat.setAttribute('id', 'statut-combat');
        this._instanceContainer.appendChild(instanceStatusCombat);
        const btnContainerLine1 = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(btnContainerLine1);
        const btnContainerLine2 = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(btnContainerLine2);
        this._btnStart = templateBtn.cloneNode(true);
        this._btnStart.onclick = () => this.setCombatState(Combat.STATE_START());
        btnContainerLine1.appendChild(this._btnStart);
        this._btnForfeit = templateBtn.cloneNode(true);
        this._btnForfeit.onclick = () => this.setCombatState(Combat.STATE_FORFEIT());
        btnContainerLine1.appendChild(this._btnForfeit);
        this._btnPrevious = templateBtn.cloneNode(true);
        this._btnPrevious.onclick = () => this.setCombatState(Combat.STATE_PREVIOUS());
        btnContainerLine1.appendChild(this._btnPrevious);
        this._btnNext = templateBtn.cloneNode(true);
        this._btnNext.onclick = () => this.setCombatState(Combat.STATE_NEXT());
        btnContainerLine1.appendChild(this._btnNext);
        this._btnLoop = templateBtn.cloneNode(true);
        this._btnLoop.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_LOOP());
        this._btnLoop.innerHTML = "Loop";
        btnContainerLine2.appendChild(this._btnLoop);
        this._btnIncrement = templateBtn.cloneNode(true);
        this._btnIncrement.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_INCREMENT());
        this._btnIncrement.innerHTML = "Increment";
        btnContainerLine2.appendChild(this._btnIncrement);
        this._instanceContainer.appendChild(this._adventureSceneGraphicComponent);
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnIncrement, true);
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnLoop);
    }
    setCombatState(combatState) {
        const combat = this._container.get(Combat.name);
        combat.setCombatState(combatState);
        if (combat.getCombatState() == Combat.STATE_START()) {
            combat.setCombatCountDownLevel(3);
        }
        console.info("Combat state set to : " + combat.getCombatState());
    }
    internalLoop() {
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_updateTextStatus).call(this);
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_updateLevelText).call(this);
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setBackgroundImage).call(this);
        __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_displayBtnText).call(this);
    }
    setAutomaticMode(automaticMode) {
        const combat = this._container.get(Combat.name);
        const chat = this._container.get(Chat.name);
        chat.addChatMessage("Automatic mode set to " + automaticMode, ChatMessage.COMBAT());
        combat.setAutomaticMode(automaticMode);
        if (combat.getAutomaticMode() == Combat.AUTOMATIC_MODE_INCREMENT()) {
            __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnLoop, true);
            __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnIncrement);
        }
        else {
            __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnIncrement, true);
            __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_setAnimationBtn).call(this, this._btnLoop);
        }
    }
}
_CombatMenuGraphicComponent_instances = new WeakSet(), _CombatMenuGraphicComponent_displayBtnText = function _CombatMenuGraphicComponent_displayBtnText() {
    const combat = this._container.get(Combat.name);
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    if (combat.getCurrentWorld()) {
        this._btnStart.innerHTML = F.sprintf("Start Level %s", allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()));
        this._btnForfeit.innerHTML = F.sprintf("Forfeit Level %s", allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()));
        this._btnPrevious.innerHTML = F.sprintf("Previous level (%s)", allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()) - 1);
        this._btnNext.innerHTML = F.sprintf("Next level (%s)", allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()) + 1);
    }
}, _CombatMenuGraphicComponent_setAnimationBtn = function _CombatMenuGraphicComponent_setAnimationBtn(e, reverse = false) {
    //animation
    e.style.animation = 'non';
    e.offsetHeight;
    e.style.animation = null;
    e.style.animationDuration = "50ms";
    e.style.animationTimingFunction = "linear";
    e.style.animationName = "clickAutomaticMode";
    e.style.animationDelay = "0ms";
    e.style.animationIterationCount = "1";
    e.style.animationFillMode = "none";
    e.style.animationPlayState = "running";
    e.style.animationTimeline = "auto";
    e.style.webkitAnimationFillMode = "forwards";
    (reverse) ? e.style.animationDirection = "reverse" : e.style.animationDirection = "normal";
}, _CombatMenuGraphicComponent_setBackgroundImage = function _CombatMenuGraphicComponent_setBackgroundImage() {
    const combat = this._container.get(Combat.name);
    if (combat.getCurrentWorld()) {
        const url = F.sprintf("url(./img/world/%s.jpg)", combat.getCurrentWorld().getName());
        this._instanceContainer.style.backgroundImage = url;
        this._instanceContainer.style.backgroundPosition = "0%";
    }
}, _CombatMenuGraphicComponent_updateTextStatus = function _CombatMenuGraphicComponent_updateTextStatus() {
    const combat = this._container.get(Combat.name);
    const statutCombatDiv = this._shadowRoot.querySelectorAll("#statut-combat")[0];
    statutCombatDiv.innerHTML = combat.getCombatStatusText();
}, _CombatMenuGraphicComponent_updateLevelText = function _CombatMenuGraphicComponent_updateLevelText() {
    const levelTextDiv = this._shadowRoot.querySelectorAll("#level-text")[0];
    levelTextDiv.innerHTML = F.sprintf("Current Level : %s | Max Level : %s", __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_getCurrentLevelName).call(this), __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_getMaxLevelReachName).call(this));
}, _CombatMenuGraphicComponent_getCurrentLevelName = function _CombatMenuGraphicComponent_getCurrentLevelName() {
    const combat = this._container.get(Combat.name);
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    if (combat.getCurrentWorld()) {
        return F.sprintf("%s_%s", combat.getCurrentWorld().getName(), allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()));
    }
    return "EMPTY";
}, _CombatMenuGraphicComponent_getMaxLevelReachName = function _CombatMenuGraphicComponent_getMaxLevelReachName() {
    const combat = this._container.get(Combat.name);
    const allWorldProgress = this._container.get(AllWorldProgress.name);
    if (combat.getCurrentWorld()) {
        return F.sprintf("%s_%s", combat.getCurrentWorld().getName(), allWorldProgress.getMaxLevelReachForWorld(combat.getCurrentWorld().getName()));
    }
    return "EMPTY";
};
customElements.define('combat-menu', CombatMenuGraphicComponent);
export default CombatMenuGraphicComponent;
//# sourceMappingURL=CombatMenuGraphicComponent.js.map