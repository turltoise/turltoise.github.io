var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CombatPanelGraphicComponent_instances, _CombatPanelGraphicComponent_displayDescription, _CombatPanelGraphicComponent_goToWorld;
import WorldList from "../../Game/Adventure/WorldList.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import Combat from "../../Game/Combat.js";
import AllWorldProgress from "../../Game/State/AllWorldProgress.js";
import F from "../../Game/Tools/F.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CombatMenuGraphicComponent from "./Combat/CombatMenuGraphicComponent.js";
class CombatPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        _CombatPanelGraphicComponent_instances.add(this);
        this._mapDescriptionText = new Map();
        this._combatMenuGraphicComponent = container.get(CombatMenuGraphicComponent.name);
        const templateContainerAdventure = this.getCurrentDocument().createElement('div');
        // list of adventure
        this._instanceListAdventure = templateContainerAdventure.cloneNode(true);
        // frame for combat
        this._instanceCombat = templateContainerAdventure.cloneNode(true);
        const templateAdventureFrameTitle = this.getCurrentDocument().createElement('div');
        templateAdventureFrameTitle.style.width = "100%";
        //templateAdventureFrameTitle.style.marginLeft = "calc(25% - 30px*2)";
        templateAdventureFrameTitle.style.marginBottom = "20px";
        templateAdventureFrameTitle.style.backgroundColor = "#A3E1FF";
        templateAdventureFrameTitle.style.color = "#666";
        templateAdventureFrameTitle.style.fontSize = "24px";
        templateAdventureFrameTitle.style.fontWeight = "bold";
        templateAdventureFrameTitle.style.cursor = "pointer";
        templateAdventureFrameTitle.style.backgroundPosition = "-100%, -100%";
        templateAdventureFrameTitle.style.backgroundSize = "300%";
        const templateTitleText = this.getCurrentDocument().createElement('div');
        this._templateTitleText = templateTitleText;
        this._templateTitleText.style.backgroundColor = "rgba(255,255,255,0.5)";
        this._templateTitleText.style.color = "black";
        this._templateTitleText.style.padding = "35px";
        this._templateTitleText.style.width = "30%";
        const templateDescriptionText = this.getCurrentDocument().createElement('div');
        this._templateDescriptionText = templateDescriptionText;
        this._templateDescriptionText.style.fontSize = "14px";
        this._templateDescriptionText.style.fontWeight = "normal";
        this._templateDescriptionText.style.color = "#666";
        const worldList = this._container.get(WorldList.name);
        worldList.getList().forEach((worldObject, id) => {
            const instanceTitleText = this._templateTitleText.cloneNode(true);
            instanceTitleText.innerHTML = worldObject.getName();
            const instanceDescriptionText = this._templateDescriptionText.cloneNode(true);
            this._mapDescriptionText.set(worldObject, instanceDescriptionText);
            instanceDescriptionText.innerHTML = "Level : x";
            this._instanceWorld = templateAdventureFrameTitle.cloneNode(true);
            this._instanceWorld.onclick = () => __classPrivateFieldGet(this, _CombatPanelGraphicComponent_instances, "m", _CombatPanelGraphicComponent_goToWorld).call(this, worldObject);
            this._instanceWorld.style.backgroundImage = F.sprintf("url(./img/world/%s.jpg)", worldObject.getName());
            this._instanceWorld.appendChild(instanceTitleText);
            instanceTitleText.appendChild(instanceDescriptionText);
            this._instanceListAdventure.appendChild(this._instanceWorld);
        });
        this._instanceListAdventure.style.padding = "20px";
        this._instanceCombat.appendChild(this._combatMenuGraphicComponent);
        this._instanceCombat.style.display = "none";
        this._instanceContainer.style.backgroundColor = "#A3E1FF"; // TODO REPLACE WITH BACKGROUND IMAGE
        this._instanceContainer.appendChild(this._instanceListAdventure);
        this._instanceContainer.appendChild(this._instanceCombat);
    }
    internalLoop() {
        __classPrivateFieldGet(this, _CombatPanelGraphicComponent_instances, "m", _CombatPanelGraphicComponent_displayDescription).call(this);
    }
    returnToList() {
        this._instanceCombat.style.display = "none";
        this._instanceListAdventure.style.display = "block";
    }
}
_CombatPanelGraphicComponent_instances = new WeakSet(), _CombatPanelGraphicComponent_displayDescription = function _CombatPanelGraphicComponent_displayDescription() {
    let combat = this._container.get(Combat.name);
    this._mapDescriptionText.forEach((description, world) => {
        let allWorldProgress = this._container.get(AllWorldProgress.name);
        let maxLevel = allWorldProgress.getMaxLevelReachForWorld(world.getName());
        let desc = "Level reached: " + maxLevel;
        if (combat.getWorldInProgress() == world.getName()) {
            let currentLvlNumber = combat.getCurrentLevel().getLevelNumber();
            desc += " in progress level " + currentLvlNumber;
        }
        description.innerHTML = desc;
    });
}, _CombatPanelGraphicComponent_goToWorld = function _CombatPanelGraphicComponent_goToWorld(world) {
    let combat = this._container.get(Combat.name);
    if (combat.getWorldInProgress() == world.getName() || !combat.getWorldInProgress()) {
        this._instanceListAdventure.style.display = "none";
        this._instanceCombat.style.display = "block";
        const combat = this._container.get(Combat.name);
        combat.setCurrentWorld(world);
    }
    else {
        let chat = this._container.get(Chat.name);
        chat.addChatMessage("You can't change world, if a level is in progress.", ChatMessage.ERROR());
    }
};
customElements.define('combat-panel', CombatPanelGraphicComponent);
export default CombatPanelGraphicComponent;
//# sourceMappingURL=CombatPanelGraphicComponent.js.map