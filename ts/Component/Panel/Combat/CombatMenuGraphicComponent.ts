import State from "../../../Game/State/State.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";

class CombatMenuGraphicComponent extends AbstractGraphicComponent {
    private _adventureSceneGraphicComponent: HTMLElement;
    private _templateLevelText: HTMLElement;
    private _templateBtn: HTMLElement;
    private _templateStatusCombat: HTMLElement;
    private _instanceLevelText: HTMLElement;
    private _instanceStatusCombat: HTMLElement;

	    constructor(state: State, adventureSceneGraphicComponent) {
        super(state);

        this._state = state;
        this._adventureSceneGraphicComponent = adventureSceneGraphicComponent;

        this._instanceContainer.style.backgroundColor = "#C0C0C0";//"#0C5D20";//"#145f24";
        
        this._instanceContainer.style.padding = "10px";

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

        this._instanceLevelText = <HTMLElement> this._templateLevelText.cloneNode(true);
        this._instanceLevelText.setAttribute('id', 'level-text');
        this._instanceLevelText.style.backgroundColor = "rgba(255,255,255,0.8)";
        this._instanceLevelText.style.padding = "5px";

        const btnStart = <HTMLElement> this._templateBtn.cloneNode(true);
        //btnStart.src = "./img/combat/play.png";
        btnStart.innerHTML = "Start";
        btnStart.onclick = () => this.setCombatState(CombatMenuGraphicComponent.getStart());

        const btnStop = <HTMLElement> this._templateBtn.cloneNode(true);
        //btnStop.src = "./img/combat/stop.png";
        btnStop.innerHTML = "Stop";
        btnStop.onclick = () => this.setCombatState(CombatMenuGraphicComponent.getStop());

        const btnPrevious = <HTMLElement> this._templateBtn.cloneNode(true);
        //btnPrevious.src = "./img/combat/previous.png";
        btnPrevious.innerHTML = "Previous level";
        btnPrevious.onclick = () => this.setCombatState(CombatMenuGraphicComponent.getPrevious());

        const btnNext = <HTMLElement> this._templateBtn.cloneNode(true);
        //btnNext.src = "./img/combat/next.png";
        btnNext.innerHTML = "Next level";
        btnNext.onclick = () => this.setCombatState(CombatMenuGraphicComponent.getNext());

        
        this._instanceContainer.appendChild(this._instanceLevelText);
        this._instanceContainer.appendChild(btnStart);
        //this._instanceContainer.appendChild(btnStop); // no need for a stop btn ?
        this._instanceContainer.appendChild(btnPrevious);
        this._instanceContainer.appendChild(btnNext);

        this._instanceStatusCombat = <HTMLElement> this._templateStatusCombat.cloneNode(true);
        this._instanceStatusCombat.setAttribute('id', 'statut-combat');
        this._instanceContainer.appendChild(this._instanceStatusCombat);

        this._instanceContainer.appendChild(this._adventureSceneGraphicComponent);

    }

    setCombatState(state: string) {
        this._state.setCombatState(state);
        if (this._state.getCombatState() == CombatMenuGraphicComponent.getStart()) {
            this._state.setCombatCountDownLevel(3);
        }
        console.info("Combat state set to : " + this._state.getCombatState());
    }

    internalLoop() {
        this.#updateTextStatus();
        this.#updateLevelText();
        this.#setBackgroundImage();
    }

    #setBackgroundImage() {
        if (this._state.getCurrentWorld()) {
            const url = "url(./img/world/"+this._state.getCurrentWorld().constructor.name+".jpg)";
            this._instanceContainer.style.backgroundImage = url;
            this._instanceContainer.style.backgroundPosition = "-25%, -25%";
            this._instanceContainer.style.backgroundSize = "150%";
        }
    }

    #updateTextStatus() {
        const statutCombatDiv = this._shadowRoot.querySelectorAll("#statut-combat")[0];
        statutCombatDiv.innerHTML = this._state.getCombatStatusText();
    }

    #updateLevelText() {
        const levelTextDiv = this._shadowRoot.querySelectorAll("#level-text")[0];
        levelTextDiv.innerHTML = "Current Level : " + this.#getCurrentLevelName() + " | Max Level : "+this.#getMaxLevelReachName();
    }

    #getCurrentLevelName() {
        if (this._state.getCurrentWorld()) {
            return this._state.getCurrentWorld().getName() + "_" + this._state.getAllWorldProgress().getCurrentLevelForWorld(this._state.getCurrentWorld().getName());
        }
        return "EMPTY";
    }

    #getMaxLevelReachName() {
        if (this._state.getCurrentWorld()) {
            return this._state.getCurrentWorld().getName() + "_" + this._state.getAllWorldProgress().getMaxLevelReachForWorld(this._state.getCurrentWorld().getName());
        }
        return "EMPTY";
    }

    static getStart() { return "START"; }
    // after start
    static getStarting() { return "STARTING"; }
    static getStop() { return "STOP"; }
    static getPrevious() { return "PREVIOUS"; }
    static getNext() { return "NEXT"; }
    static getContinue() { return "CONTINUE"; }
}
customElements.define('combat-menu', CombatMenuGraphicComponent);
export default CombatMenuGraphicComponent;