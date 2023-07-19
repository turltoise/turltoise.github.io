import MainScreen from "../Game/MainScreen.js";
import State from "../Game/State/State.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";

class MainMenuGraphicComponent extends AbstractGraphicComponent {
    private _mainScreen: MainScreen;
    private _instanceMenuCombat: HTMLElement;
    private _instanceMenuCollection: HTMLElement;
    private _instanceMenuOpening: HTMLElement;
    private _instanceMenuShop: HTMLElement;

	constructor(state: State, mainScreen: MainScreen) {
		super(state);

		this._mainScreen = mainScreen;

        
        let keyframes = `
        @keyframes clickMenu {
            0%   {
                box-shadow: 2px 4px #222;
                background-color: `+MainMenuGraphicComponent.BGC_NORMAL()+`;
                transform: translate(0, 0);
            }
            100%  {
                box-shadow: 0px 0px #222;
                background-color: `+MainMenuGraphicComponent.BGC_CLICK()+`;
                transform: translate(2px, 4px);
            }
        }`;
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
        templateStyle.innerHTML = keyframes;
        this._instanceContainer.appendChild(templateStyle);   

        const templateMenuButton = this.getCurrentDocument().createElement('div');
        templateMenuButton.setAttribute('class', this.getClassName('btn'));
        templateMenuButton.style.cursor = "pointer";
        templateMenuButton.style.display = "inline-block";
        templateMenuButton.style.margin = "5px";
        templateMenuButton.style.padding = "5px";
        templateMenuButton.style.backgroundColor = MainMenuGraphicComponent.BGC_NORMAL();
        templateMenuButton.style.color = "white";
        templateMenuButton.style.fontWeight = "bold";
        templateMenuButton.style.caretColor = "transparent";
        templateMenuButton.style.borderRadius = "3px";
        templateMenuButton.style.width = "200px";
        templateMenuButton.style.boxShadow = "2px 4px #222";
        templateMenuButton.style.userSelect = "none";


        const instanceMenuCombat = <HTMLElement> templateMenuButton.cloneNode(true);
        instanceMenuCombat.innerHTML = "Combat";
        instanceMenuCombat.onclick = () => this.goToPage(this._mainScreen.getLabelCombat());
        // clicked first
        instanceMenuCombat.style.boxShadow = "0px 0px #555";
        instanceMenuCombat.style.backgroundColor = MainMenuGraphicComponent.BGC_CLICK();
        instanceMenuCombat.style.transform = "translate(2px, 4px)";

        this._instanceMenuCombat = instanceMenuCombat;

        const instanceMenuCollection = <HTMLElement> templateMenuButton.cloneNode(true);
        instanceMenuCollection.innerHTML = "Collection";
		instanceMenuCollection.onclick = () => this.goToPage(this._mainScreen.getLabelCollection());
        this._instanceMenuCollection = instanceMenuCollection;

        const instanceMenuOpening = <HTMLElement> templateMenuButton.cloneNode(true);
        instanceMenuOpening.innerHTML = "Opening";
        instanceMenuOpening.onclick = () => this.goToPage(this._mainScreen.getLabelOpening());
        this._instanceMenuOpening = instanceMenuOpening;

        const instanceMenuShop = <HTMLElement> templateMenuButton.cloneNode(true);
        instanceMenuShop.innerHTML = "Shop";
        instanceMenuShop.onclick = () => this.goToPage(this._mainScreen.getLabelShop());
        this._instanceMenuShop = instanceMenuShop;

        this._instanceContainer.appendChild(instanceMenuCombat);
        this._instanceContainer.appendChild(instanceMenuCollection);
        this._instanceContainer.appendChild(instanceMenuOpening);
        this._instanceContainer.appendChild(instanceMenuShop);

        this.#displayPanel(this._mainScreen.getLabelCombat());
	}

    #displayPanel(name: string) {
        for (var panelKey in this._mainScreen.getPanelList()) {
            var currentPanel = this._mainScreen.getPanelList()[panelKey];
            if (panelKey == name) {
                console.debug("Display panel : " + name);
                currentPanel.style.display = "block";
                this._mainScreen.setCurrentPanel(name);
            } else {
                currentPanel.style.display = "none";
            }
        }
    }

    goToPage(label) {
        if (label != this._mainScreen.getCurrentPanel()) {        
            let btnUnselected = this.#getBtnFromLabel(this._mainScreen.getCurrentPanel());
            this.#setAnimationBtn(btnUnselected, true);

            this.#displayPanel(label);

            let btnSelected = this.#getBtnFromLabel(label);
            this.#setAnimationBtn(btnSelected);
        }
    }

    #getBtnFromLabel(label) {
        let e = null;
        switch (label) {
            case(this._mainScreen.getLabelCombat()):
                e = this._instanceMenuCombat;
                break;
            case(this._mainScreen.getLabelCollection()):
                e = this._instanceMenuCollection;
                break;
            case(this._mainScreen.getLabelOpening()):
                e = this._instanceMenuOpening;
                break;
            case(this._mainScreen.getLabelShop()):
                e = this._instanceMenuShop;
                break;
            default:
                return null;
        }
        return e;
    }

    #setAnimationBtn(e, reverse=false) {
        //animation
        e.style.animation = 'non';
        e.offsetHeight;
        e.style.animation = null;

        e.style.animationDuration = "50ms";
        e.style.animationTimingFunction = "linear";
        e.style.animationName = "clickMenu";
        e.style.animationDelay = "0ms";
        e.style.animationIterationCount = "1";
        
        e.style.animationFillMode = "none";
        e.style.animationPlayState = "running";
        e.style.animationTimeline = "auto";
        e.style.webkitAnimationFillMode = "forwards";
        (reverse) ? e.style.animationDirection = "reverse" : e.style.animationDirection = "normal";
    }

    // background color
    static BGC_NORMAL() {
        return "#B25B21"; 
    }

    static BGC_SELECTED() {

        return "#DC8734";
    }

    static BGC_CLICK() {

        return "#DC8734";
    }
}
customElements.define('main-menu', MainMenuGraphicComponent);
export default MainMenuGraphicComponent;
