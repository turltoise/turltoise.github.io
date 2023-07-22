var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CombatPanelGraphicComponent_instances, _CombatPanelGraphicComponent_launchWorld, _CombatPanelGraphicComponent_returnToList;
import WorldList from "../../Game/Adventure/WorldList.js";
import Combat from "../../Game/Combat.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CombatMenuGraphicComponent from "./Combat/CombatMenuGraphicComponent.js";
class CombatPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        _CombatPanelGraphicComponent_instances.add(this);
        this._combatMenuGraphicComponent = container.get(CombatMenuGraphicComponent.name);
        const templateContainerAdventure = this.getCurrentDocument().createElement('div');
        // list of adventure
        this._instanceListAdventure = templateContainerAdventure.cloneNode(true);
        // frame for combat
        this._instanceCombat = templateContainerAdventure.cloneNode(true);
        const templateAdventureFrameTitle = this.getCurrentDocument().createElement('div');
        templateAdventureFrameTitle.style.width = "50%";
        templateAdventureFrameTitle.style.marginLeft = "calc(25% - 30px*2)";
        templateAdventureFrameTitle.style.marginBottom = "20px";
        templateAdventureFrameTitle.style.backgroundColor = "#A3E1FF";
        templateAdventureFrameTitle.style.color = "#666";
        templateAdventureFrameTitle.style.fontSize = "24px";
        templateAdventureFrameTitle.style.fontWeight = "bold";
        templateAdventureFrameTitle.style.cursor = "pointer";
        //templateAdventureFrameTitle.style.webkitTextStroke = "2px black";
        const templateBtnReturn = this.getCurrentDocument().createElement('div');
        this._instanceBtnReturn = templateBtnReturn.cloneNode(true);
        this._instanceBtnReturn.innerHTML = "↩ Return to adventure list";
        this._instanceBtnReturn.onclick = () => __classPrivateFieldGet(this, _CombatPanelGraphicComponent_instances, "m", _CombatPanelGraphicComponent_returnToList).call(this);
        this._instanceBtnReturn.style.fontWeight = "bold";
        this._instanceBtnReturn.style.color = "white";
        this._instanceBtnReturn.style.cursor = "pointer";
        this._instanceBtnReturn.style.caretColor = "transparent";
        this._instanceBtnReturn.style.margin = "20px";
        this._instanceBtnReturn.style.backgroundColor = "#A3E1FF";
        this._instanceBtnReturn.style.width = "200px";
        this._instanceBtnReturn.style.padding = "5px";
        this._instanceBtnReturn.style.display = "inline-block";
        const templateTitleAdventure = this.getCurrentDocument().createElement('div');
        this._instanceTitleAdventure = templateTitleAdventure.cloneNode(true);
        this._instanceTitleAdventure.style.fontWeight = "bold";
        this._instanceTitleAdventure.style.color = "white";
        this._instanceTitleAdventure.style.cursor = "pointer";
        this._instanceTitleAdventure.style.margin = "20px";
        this._instanceTitleAdventure.style.backgroundColor = "red";
        this._instanceTitleAdventure.style.width = "200px";
        this._instanceTitleAdventure.style.padding = "5px";
        this._instanceTitleAdventure.style.display = "inline-block";
        this._instanceCombat.appendChild(this._instanceBtnReturn);
        this._instanceCombat.appendChild(this._instanceTitleAdventure);
        const templateTitleText = this.getCurrentDocument().createElement('div');
        this._templateTitleText = templateTitleText;
        this._templateTitleText.style.backgroundColor = "rgba(255,255,255,0.5)";
        this._templateTitleText.style.color = "black";
        this._templateTitleText.style.padding = "35px";
        this._templateTitleText.style.width = "30%";
        const worldList = this._container.get(WorldList.name);
        worldList.getList().forEach((worldObject, id) => {
            const instanceTitleText = this._templateTitleText.cloneNode(true);
            instanceTitleText.innerHTML = worldObject.constructor.name;
            this._instanceWorld = templateAdventureFrameTitle.cloneNode(true);
            this._instanceWorld.onclick = () => __classPrivateFieldGet(this, _CombatPanelGraphicComponent_instances, "m", _CombatPanelGraphicComponent_launchWorld).call(this, worldObject);
            this._instanceWorld.style.backgroundImage = "url(./img/world/" + worldObject.constructor.name + ".jpg)";
            this._instanceWorld.style.backgroundPosition = "-100%, -100%";
            this._instanceWorld.style.backgroundSize = "300%";
            this._instanceWorld.appendChild(instanceTitleText);
            this._instanceListAdventure.appendChild(this._instanceWorld);
        });
        this._instanceListAdventure.style.padding = "20px";
        this._instanceCombat.appendChild(this._combatMenuGraphicComponent);
        this._instanceCombat.style.display = "none";
        this._instanceContainer.style.backgroundColor = "#A3E1FF";
        //this._instanceContainer.style.padding = "20px 0px 20px 0px";
        this._instanceContainer.appendChild(this._instanceListAdventure);
        this._instanceContainer.appendChild(this._instanceCombat);
    }
}
_CombatPanelGraphicComponent_instances = new WeakSet(), _CombatPanelGraphicComponent_launchWorld = function _CombatPanelGraphicComponent_launchWorld(world) {
    this._instanceListAdventure.style.display = "none";
    this._instanceCombat.style.display = "block";
    const combat = this._container.get(Combat.name);
    combat.setCurrentWorld(world);
    this._instanceTitleAdventure.innerHTML = combat.getCurrentWorld().constructor.name;
}, _CombatPanelGraphicComponent_returnToList = function _CombatPanelGraphicComponent_returnToList() {
    this._instanceCombat.style.display = "none";
    this._instanceListAdventure.style.display = "block";
};
customElements.define('combat-panel', CombatPanelGraphicComponent);
export default CombatPanelGraphicComponent;
//# sourceMappingURL=CombatPanelGraphicComponent.js.map