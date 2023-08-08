import Container from "../../../Container.js";
import Chat from "../../../Game/Chat/Chat.js";
import ChatMessage from "../../../Game/Chat/ChatMessage.js";
import Combat from "../../../Game/Combat.js";
import AllWorldProgress from "../../../Game/State/AllWorldProgress.js";
import F from "../../../Game/Tools/F.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import AdventureSceneGraphicComponent from "./AdventureSceneGraphicComponent.js";

class CombatMenuGraphicComponent extends AbstractGraphicComponent {
    private _adventureSceneGraphicComponent: AdventureSceneGraphicComponent;

    private _btnStart: HTMLElement;
    private _btnForfeit: HTMLElement;
    private _btnPrevious: HTMLElement;
    private _btnNext: HTMLElement;

    private _btnLoop: HTMLElement;
    private _btnIncrement: HTMLElement;

	    constructor(container: Container) {
        super(container);

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
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
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

        const instanceLevelText = <HTMLElement> this.getCurrentDocument().createElement('div');
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

        this._btnStart = <HTMLElement> templateBtn.cloneNode(true);
        this._btnStart.onclick = () => this.setCombatState(Combat.STATE_START());
        btnContainerLine1.appendChild(this._btnStart);

        this._btnForfeit = <HTMLElement> templateBtn.cloneNode(true);
        this._btnForfeit.onclick = () => this.setCombatState(Combat.STATE_FORFEIT());
        btnContainerLine1.appendChild(this._btnForfeit);

        this._btnPrevious = <HTMLElement> templateBtn.cloneNode(true);
        this._btnPrevious .onclick = () => this.setCombatState(Combat.STATE_PREVIOUS());
        btnContainerLine1.appendChild(this._btnPrevious);

        this._btnNext = <HTMLElement> templateBtn.cloneNode(true);
        this._btnNext.onclick = () => this.setCombatState(Combat.STATE_NEXT());
        btnContainerLine1.appendChild(this._btnNext);

        this._btnLoop = <HTMLElement> templateBtn.cloneNode(true);
        this._btnLoop.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_LOOP());
        this._btnLoop.innerHTML = "Loop";
        btnContainerLine2.appendChild(this._btnLoop);

        this._btnIncrement = <HTMLElement> templateBtn.cloneNode(true);
        this._btnIncrement.onclick = () => this.setAutomaticMode(Combat.AUTOMATIC_MODE_INCREMENT());
        this._btnIncrement.innerHTML = "Increment";
        btnContainerLine2.appendChild(this._btnIncrement);

        this._instanceContainer.appendChild(this._adventureSceneGraphicComponent);

        this.#setAnimationBtn(this._btnIncrement, true);
        this.#setAnimationBtn(this._btnLoop);
    }

    setCombatState(combatState: string) {
        const combat: Combat = this._container.get(Combat.name);
        combat.setCombatState(combatState);
        if (combat.getCombatState() == Combat.STATE_START()) {
            combat.setCombatCountDownLevel(3);
        }
        console.info("Combat state set to : " + combat.getCombatState());
    }

    internalLoop(): void {
        this.#updateTextStatus();
        this.#updateLevelText();
        this.#setBackgroundImage();
        this.#displayBtnText();
    }

    setAutomaticMode(automaticMode: string) {
        const combat: Combat = this._container.get(Combat.name);
        const chat: Chat = this._container.get(Chat.name);
        chat.addChatMessage(
            "Automatic mode set to " + automaticMode,
            ChatMessage.COMBAT()
        );
        combat.setAutomaticMode(automaticMode);
        if (combat.getAutomaticMode() == Combat.AUTOMATIC_MODE_INCREMENT()) {
            this.#setAnimationBtn(this._btnLoop, true);
            this.#setAnimationBtn(this._btnIncrement);
        } else {
            this.#setAnimationBtn(this._btnIncrement, true);
            this.#setAnimationBtn(this._btnLoop);
        }  
    }

    #displayBtnText(): void {
        const combat: Combat = this._container.get(Combat.name);
        const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
        if (combat.getCurrentWorld()) {
            this._btnStart.innerHTML = F.sprintf(
                "Start Level %s",
                allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName())
             );
            this._btnForfeit.innerHTML = F.sprintf(
                "Forfeit Level %s",
                allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName())
            );
            this._btnPrevious .innerHTML = F.sprintf(
                "Previous level (%s)",
                allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()) - 1
            );
            this._btnNext.innerHTML = F.sprintf(
                "Next level (%s)",
                allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName()) + 1
            );
        }
    }

    #setAnimationBtn(e, reverse: boolean = false) {
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
    }

    #setBackgroundImage(): void {
        const combat: Combat = this._container.get(Combat.name);
        if (combat.getCurrentWorld()) {
            const url = F.sprintf(
                "url(./img/world/%s.jpg)",
                combat.getCurrentWorld().getName()
            );
            this._instanceContainer.style.backgroundImage = url;
            this._instanceContainer.style.backgroundPosition = "0%";
        }
    }

    #updateTextStatus() {
        const combat: Combat = this._container.get(Combat.name);
        const statutCombatDiv = this._shadowRoot.querySelectorAll("#statut-combat")[0];
        statutCombatDiv.innerHTML = combat.getCombatStatusText();
    }

    #updateLevelText() {
        const levelTextDiv = this._shadowRoot.querySelectorAll("#level-text")[0];
        levelTextDiv.innerHTML = F.sprintf(
            "Current Level : %s | Max Level : %s",
            this.#getCurrentLevelName(),
            this.#getMaxLevelReachName()
        );
    }

    #getCurrentLevelName() {
        const combat: Combat = this._container.get(Combat.name);
        const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
        if (combat.getCurrentWorld()) {
            return F.sprintf(
                "%s_%s",
                combat.getCurrentWorld().getName(),
                allWorldProgress.getCurrentLevelForWorld(combat.getCurrentWorld().getName())
            );
        }
        return "EMPTY";
    }

    #getMaxLevelReachName() {
        const combat: Combat = this._container.get(Combat.name);
        const allWorldProgress: AllWorldProgress = this._container.get(AllWorldProgress.name);
        if (combat.getCurrentWorld()) {
            return F.sprintf(
                "%s_%s" ,   
                combat.getCurrentWorld().getName(),
                allWorldProgress.getMaxLevelReachForWorld(combat.getCurrentWorld().getName())
            );
        }
        return "EMPTY";
    }
}
customElements.define('combat-menu', CombatMenuGraphicComponent);
export default CombatMenuGraphicComponent;