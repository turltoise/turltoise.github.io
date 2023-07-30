import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Chat from "../../Game/Chat/Chat.js";
import ChatMessage from "../../Game/Chat/ChatMessage.js";
import Combat from "../../Game/Combat.js";
import AllWorldProgress from "../../Game/State/AllWorldProgress.js";
import F from "../../Game/Tools/F.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CombatMenuGraphicComponent from "./Combat/CombatMenuGraphicComponent.js";

class CombatPanelGraphicComponent extends AbstractPanelGraphicComponent {
		private _combatMenuGraphicComponent: CombatMenuGraphicComponent;
		private _instanceListAdventure: HTMLElement;
		private _instanceCombat: HTMLElement;
		private _templateTitleText: HTMLElement;
		private _instanceWorld: HTMLElement;
		private _templateDescriptionText: HTMLElement;

		private _mapDescriptionText: Map<AbstractWorld, HTMLElement>;

	    constructor(container: Container) {
        super(container);

		this._mapDescriptionText = new Map();

        this._combatMenuGraphicComponent = container.get(CombatMenuGraphicComponent.name);

		const templateContainerAdventure = this.getCurrentDocument().createElement('div');

		// list of adventure
		this._instanceListAdventure = <HTMLElement> templateContainerAdventure.cloneNode(true);
		// frame for combat
		this._instanceCombat = <HTMLElement> templateContainerAdventure.cloneNode(true);

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

		const worldList: WorldList = this._container.get(WorldList.name); 
		worldList.getList().forEach((worldObject, id) => {
			const instanceTitleText = <HTMLElement> this._templateTitleText.cloneNode(true);
			instanceTitleText.innerHTML = worldObject.getName();

			const instanceDescriptionText= <HTMLElement> this._templateDescriptionText.cloneNode(true);
			this._mapDescriptionText.set(worldObject, instanceDescriptionText);

			instanceDescriptionText.innerHTML = "Level : x";

			this._instanceWorld = <HTMLElement> templateAdventureFrameTitle.cloneNode(true);
			this._instanceWorld.onclick = () => this.#goToWorld(worldObject);
			this._instanceWorld.style.backgroundImage = F.sprintf(
				"url(./img/world/%s.jpg)",
				worldObject.getName()
			);

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

	internalLoop(): void {
		this.#displayDescription();
	}

	#displayDescription() {
		let combat: Combat = this._container.get(Combat.name);
		this._mapDescriptionText.forEach((description: HTMLElement, world: AbstractWorld) => {
			let allWorldProgress:AllWorldProgress = this._container.get(AllWorldProgress.name);
			let maxLevel = allWorldProgress.getMaxLevelReachForWorld(world.getName());

			let desc = "Level reached: " + maxLevel;
			if (combat.getWorldInProgress() == world.getName()) {
				let currentLvlNumber = combat.getCurrentLevel().getLevelNumber();
				desc += " in progress level " + currentLvlNumber;
			}
			description.innerHTML = desc;
		});
	}

	#goToWorld(world: AbstractWorld) {
		let combat: Combat = this._container.get(Combat.name);
		if (combat.getWorldInProgress() == world.getName() || !combat.getWorldInProgress()) {
			this._instanceListAdventure.style.display = "none";
			this._instanceCombat.style.display = "block";
			const combat: Combat = this._container.get(Combat.name);
			combat.setCurrentWorld(world);
		} else {
			let chat:Chat = this._container.get(Chat.name);
			chat.addChatMessage("You can't change world, if a level is in progress.", ChatMessage.ERROR());
		}
		
	}

	returnToList(){
		this._instanceCombat.style.display = "none";
		this._instanceListAdventure.style.display = "block";
	}
}
customElements.define('combat-panel', CombatPanelGraphicComponent);
export default CombatPanelGraphicComponent;