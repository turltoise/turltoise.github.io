import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import WorldList from "../../Game/Adventure/WorldList.js";
import Combat from "../../Game/Combat.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CombatMenuGraphicComponent from "./Combat/CombatMenuGraphicComponent.js";

class CombatPanelGraphicComponent extends AbstractPanelGraphicComponent {
		private _combatMenuGraphicComponent: CombatMenuGraphicComponent;
		private _instanceListAdventure: HTMLElement;
		private _instanceCombat: HTMLElement;
		private _instanceBtnReturn: HTMLElement;
		private _instanceTitleAdventure: HTMLElement;
		private _templateTitleText: HTMLElement;
		private _instanceWorld: HTMLElement;

	    constructor(container: Container) {
        super(container);

		this._instanceContainer.innerHTML = "TO DO ADD COMPLETION";

        this._combatMenuGraphicComponent = container.get(CombatMenuGraphicComponent.name);

		const templateContainerAdventure = this.getCurrentDocument().createElement('div');

		// list of adventure
		this._instanceListAdventure = <HTMLElement> templateContainerAdventure.cloneNode(true);
		// frame for combat
		this._instanceCombat = <HTMLElement> templateContainerAdventure.cloneNode(true);

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
		this._instanceBtnReturn = <HTMLElement> templateBtnReturn.cloneNode(true);
		this._instanceBtnReturn.innerHTML = "↩ Return to adventure list";
		this._instanceBtnReturn.onclick = () => this.#returnToList();
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
		this._instanceTitleAdventure = <HTMLElement> templateTitleAdventure.cloneNode(true);

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

		const worldList: WorldList = this._container.get(WorldList.name); 
		worldList.getList().forEach((worldObject, id) => {
			const instanceTitleText = <HTMLElement> this._templateTitleText.cloneNode(true);
			instanceTitleText.innerHTML = worldObject.getName();
			this._instanceWorld = <HTMLElement> templateAdventureFrameTitle.cloneNode(true);
			this._instanceWorld.onclick = () => this.#launchWorld(worldObject);
			this._instanceWorld.style.backgroundImage = "url(./img/world/"+worldObject.getName()+".jpg)";
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

	#launchWorld(world: AbstractWorld) {
		this._instanceListAdventure.style.display = "none";
		this._instanceCombat.style.display = "block";
		const combat: Combat = this._container.get(Combat.name);
		combat.setCurrentWorld(world);
		this._instanceTitleAdventure.innerHTML = combat.getCurrentWorld().getName();
	}

	#returnToList(){
		this._instanceCombat.style.display = "none";
		this._instanceListAdventure.style.display = "block";
	}
}
customElements.define('combat-panel', CombatPanelGraphicComponent);
export default CombatPanelGraphicComponent;