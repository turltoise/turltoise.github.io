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
		private _instanceWorld: HTMLElement;

		private _mapDescriptionText: Map<AbstractWorld, HTMLElement>;
		private _swordMap: Map<AbstractWorld, HTMLImageElement>;

	    constructor(container: Container) {
        super(container);

		this._mapDescriptionText = new Map();
		this._swordMap = new Map();

		this._instanceContainer.style.backgroundColor = "#C1BBE9";

		const worldList: WorldList = this._container.get(WorldList.name); 
		const combat: Combat = this._container.get(Combat.name);
		combat.setCurrentWorld(worldList.getFirst());

        this._combatMenuGraphicComponent = container.get(CombatMenuGraphicComponent.name);


		let style = `
        @keyframes rotate {
            0%   {
                transform: rotate(-30deg);
            }
			50% {
				transform: rotate(60deg);
			}
            100%  {
                transform: rotate(-30deg);
            }
        }`;
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
        templateStyle.innerHTML = style;
        this._instanceContainer.appendChild(templateStyle);



		const templateContainerAdventure = this.getCurrentDocument().createElement('div');

		// list of adventure
		this._instanceListAdventure = <HTMLElement> templateContainerAdventure.cloneNode(true);
		this._instanceListAdventure.style.width = "200px";
		this._instanceListAdventure.style.display = "inline-block";
		this._instanceListAdventure.style.verticalAlign = "top";
		// frame for combat
		this._instanceCombat = <HTMLElement> templateContainerAdventure.cloneNode(true);
		this._instanceCombat.style.width = "calc(100% - 200px)";
		this._instanceCombat.style.display = "inline-block";
		this._instanceCombat.style.verticalAlign = "top";

		const templateAdventureFrameTitle = this.getCurrentDocument().createElement('div');
		templateAdventureFrameTitle.style.width = "100%";
		templateAdventureFrameTitle.style.backgroundColor = "#A3E1FF";
		templateAdventureFrameTitle.style.color = "#666";
		templateAdventureFrameTitle.style.fontSize = "24px";
		templateAdventureFrameTitle.style.fontWeight = "bold";
		templateAdventureFrameTitle.style.cursor = "pointer";
		templateAdventureFrameTitle.style.backgroundPosition = "-100%, -100%";
		templateAdventureFrameTitle.style.backgroundSize = "300%";

		const templateTitleText = this.getCurrentDocument().createElement('div');
		templateTitleText.style.backgroundColor = "rgba(255,255,255,0.5)";
		templateTitleText.style.color = "black";
		templateTitleText.style.padding = "5px";
		templateTitleText.style.boxSizing = "border-box";
		templateTitleText.style.width = "60%";
		templateTitleText.style.display = "inline-block";

		const templateRightPart = this.getCurrentDocument().createElement('div');
		templateRightPart.style.width = "40%";
		templateRightPart.style.display = "inline-block";
		templateRightPart.style.textAlign = "center";
		

		const templateDescriptionText = this.getCurrentDocument().createElement('div');
		templateDescriptionText.style.fontSize = "14px";
		templateDescriptionText.style.fontWeight = "normal";
		templateDescriptionText.style.color = "#666";

		const templateSword = this.getCurrentDocument().createElement('img');
		templateSword.src = "./img/ui/sword.png";
		templateSword.style.height = "30px";
		templateSword.style.display = "none";

		templateSword.style.animation = 'non';
        templateSword.offsetHeight;
        templateSword.style.animation = null;

        templateSword.style.animationDuration = "1s";
        templateSword.style.animationTimingFunction = "linear";
		templateSword.style.animationName = "rotate";
        templateSword.style.animationDelay = "0ms";
        templateSword.style.animationIterationCount = "infinite";
        
        templateSword.style.animationFillMode = "none";
        templateSword.style.animationPlayState = "running";


		
		worldList.getList().forEach((worldObject, id) => {
			const instanceTitleText = <HTMLElement> templateTitleText.cloneNode(true);
			instanceTitleText.innerHTML = worldObject.getName();

			const instanceRightPart = <HTMLElement> templateRightPart.cloneNode(true);
			
			const sword = <HTMLImageElement> templateSword.cloneNode(true);
			this._swordMap.set(worldObject, sword);
			instanceRightPart.appendChild(sword);

			const instanceDescriptionText= <HTMLElement> templateDescriptionText.cloneNode(true);
			this._mapDescriptionText.set(worldObject, instanceDescriptionText);

			instanceDescriptionText.innerHTML = "Level : x";

			this._instanceWorld = <HTMLElement> templateAdventureFrameTitle.cloneNode(true);
			this._instanceWorld.onclick = () => this.#goToWorld(worldObject);
			this._instanceWorld.style.backgroundImage = F.sprintf(
				"url(./img/world/%s.jpg)",
				worldObject.getName()
			);

			this._instanceWorld.appendChild(instanceTitleText);
			this._instanceWorld.appendChild(instanceRightPart);
			instanceTitleText.appendChild(instanceDescriptionText);
			this._instanceListAdventure.appendChild(this._instanceWorld);
			
		});

		this._instanceCombat.appendChild(this._combatMenuGraphicComponent);

		this._instanceContainer.appendChild(this._instanceListAdventure);
		this._instanceContainer.appendChild(this._instanceCombat);

		
		console.log(worldList.getFirst());
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
				let sword = this._swordMap.get(world);
				sword.style.display = "inline-block";
			} else {
				let sword = this._swordMap.get(world);
				sword.style.display = "none";
			}
			description.innerHTML = desc;
		});
	}

	#goToWorld(world: AbstractWorld) {
		let combat: Combat = this._container.get(Combat.name);
		if (combat.getWorldInProgress() == world.getName() || !combat.getWorldInProgress()) {
			const combat: Combat = this._container.get(Combat.name);
			combat.setCurrentWorld(world);
		} else {
			let chat:Chat = this._container.get(Chat.name);
			chat.addChatMessage(
				"You can't change world, if a level is in progress.",
				ChatMessage.COMBAT()
			);
		}
		
	}
}
customElements.define('combat-panel', CombatPanelGraphicComponent);
export default CombatPanelGraphicComponent;