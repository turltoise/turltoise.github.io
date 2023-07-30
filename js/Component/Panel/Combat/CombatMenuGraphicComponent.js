var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CombatMenuGraphicComponent_instances, _CombatMenuGraphicComponent_returnToList, _CombatMenuGraphicComponent_displayBtnText, _CombatMenuGraphicComponent_setAnimationBtn, _CombatMenuGraphicComponent_setBackgroundImage, _CombatMenuGraphicComponent_updateTextStatus, _CombatMenuGraphicComponent_updateLevelText, _CombatMenuGraphicComponent_getCurrentLevelName, _CombatMenuGraphicComponent_getMaxLevelReachName;
import Chat from "../../../Game/Chat/Chat.js";
import Combat from "../../../Game/Combat.js";
import AllWorldProgress from "../../../Game/State/AllWorldProgress.js";
import F from "../../../Game/Tools/F.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CombatPanelGraphicComponent from "../CombatPanelGraphicComponent.js";
import AdventureSceneGraphicComponent from "./AdventureSceneGraphicComponent.js";
class CombatMenuGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        _CombatMenuGraphicComponent_instances.add(this);
        this._adventureSceneGraphicComponent = this._container.get(AdventureSceneGraphicComponent.name);
        this._instanceContainer.style.backgroundColor = "#C0C0C0"; //"#0C5D20";//"#145f24";
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
        const templateLevelText = this.getCurrentDocument().createElement('div');
        templateLevelText.style.fontSize = "18px";
        templateLevelText.style.display = "inline-block";
        templateLevelText.style.marginRight = "20px";
        this._templateLevelText = templateLevelText;
        const templateBtn = this.getCurrentDocument().createElement('div');
        templateBtn.setAttribute('class', this.getClassName('btn'));
        templateBtn.style.cursor = "pointer";
        templateBtn.style.display = "inline-block";
        templateBtn.style.margin = "5px";
        templateBtn.style.padding = "5px";
        templateBtn.style.backgroundColor = "#CCDDCC";
        templateBtn.style.caretColor = "transparent";
        templateBtn.style.borderRadius = "3px";
        this._templateBtn = templateBtn;
        const templateStatusCombat = this.getCurrentDocument().createElement('div');
        templateStatusCombat.innerHTML = "";
        templateStatusCombat.style.fontWeight = "bold";
        templateStatusCombat.style.marginLeft = "10px";
        templateStatusCombat.style.display = "inline-block";
        this._templateStatusCombat = templateStatusCombat;
        this.render();
    }
    render() {
        const templateBtnReturn = this.getCurrentDocument().createElement('div');
        this._instanceBtnReturn = templateBtnReturn.cloneNode(true);
        this._instanceBtnReturn.innerHTML = "↩ Return to world selection";
        this._instanceBtnReturn.onclick = () => __classPrivateFieldGet(this, _CombatMenuGraphicComponent_instances, "m", _CombatMenuGraphicComponent_returnToList).call(this);
        this._instanceBtnReturn.style.fontWeight = "bold";
        this._instanceBtnReturn.style.color = "white";
        this._instanceBtnReturn.style.cursor = "pointer";
        this._instanceBtnReturn.style.caretColor = "transparent";
        this._instanceBtnReturn.style.margin = "20px";
        this._instanceBtnReturn.style.backgroundColor = "#A3E1FF";
        this._instanceBtnReturn.style.width = "200px";
        this._instanceBtnReturn.style.padding = "5px";
        this._instanceBtnReturn.style.display = "inline-block";
        this._instanceLevelText = this._templateLevelText.cloneNode(true);
        this._instanceLevelText.setAttribute('id', 'level-text');
        this._instanceLevelText.style.backgroundColor = "rgba(255,255,255,0.8)";
        this._instanceLevelText.style.padding = "5px";
        const btnContainerLine1 = this.getCurrentDocument().createElement('div');
        btnContainerLine1.style.marginLeft = "20px";
        const btnContainerLine2 = this.getCurrentDocument().createElement('div');
        btnContainerLine2.style.marginLeft = "20px";
        this._btnStart = this._templateBtn.cloneNode(true);
        this._btnStart.onclick = () => this.setCombatState(Combat.STATE_START());
        this._btnForfeit = this._templateBtn.cloneNode(true);
        this._btnForfeit.onclick = () => this.setCombatState(Combat.STATE_FORFEIT());
        this._btnPrevious = this._templateBtn.cloneNode(true);
        this._btnPrevious.onclick = () => this.setCombatState(Combat.STATE_PREVIOUS());
        this._btnNext = this._templateBtn.cloneNode(true);
        this._btnNext.onclick = () => this.setCombatState(Combat.STATE_NEXT());
        this._instanceContainer.appendChild(btnContainerLine1);
        this._instanceContainer.appendChild(btnContainerLine2);
        btnContainerLine1.appendChild(this._btnStart);
        btnContainerLine1.appendChild(this._btnForfeit);
        btnContainerLine1.appendChild(this._btnPrevious);
        btnContainerLine1.appendChild(this._btnNext);
        this._btnLoop = this._templateBtn.cloneNode(true);
        this._btnLoop.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_LOOP());
        this._btnLoop.innerHTML = "Loop";
        this._btnIncrement = this._templateBtn.cloneNode(true);
        this._btnIncrement.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_INCREMENT());
        this._btnIncrement.innerHTML = "Increment";
        btnContainerLine2.appendChild(this._btnLoop);
        btnContainerLine2.appendChild(this._btnIncrement);
        this._instanceContainer.appendChild(this._instanceBtnReturn);
        this._instanceContainer.appendChild(this._instanceLevelText);
        this._instanceStatusCombat = this._templateStatusCombat.cloneNode(true);
        this._instanceStatusCombat.setAttribute('id', 'statut-combat');
        this._instanceContainer.appendChild(this._instanceStatusCombat);
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
        chat.addChatMessage("Automatic mode set to " + automaticMode, null);
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
_CombatMenuGraphicComponent_instances = new WeakSet(), _CombatMenuGraphicComponent_returnToList = function _CombatMenuGraphicComponent_returnToList() {
    let combatPanel = this._container.get(CombatPanelGraphicComponent.name);
    combatPanel.returnToList();
}, _CombatMenuGraphicComponent_displayBtnText = function _CombatMenuGraphicComponent_displayBtnText() {
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