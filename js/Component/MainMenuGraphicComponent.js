var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MainMenuGraphicComponent_instances, _MainMenuGraphicComponent_displayPanel, _MainMenuGraphicComponent_getBtnFromLabel, _MainMenuGraphicComponent_setAnimationBtn;
import Booster from "../Game/Booster/Booster.js";
import MainScreen from "../Game/MainScreen.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
class MainMenuGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        _MainMenuGraphicComponent_instances.add(this);
        this._mainScreen = this._container.get(MainScreen.name);
        let keyframes = `
        @keyframes clickMenu {
            0%   {
                box-shadow: 2px 4px #222;
                background-color: ` + MainMenuGraphicComponent.BGC_NORMAL() + `;
                transform: translate(0, 0);
            }
            100%  {
                box-shadow: 0px 0px #222;
                background-color: ` + MainMenuGraphicComponent.BGC_CLICK() + `;
                transform: translate(2px, 4px);
            }
        }`;
        let templateStyle = this.getCurrentDocument().createElement('style');
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
        const instanceMenuCombat = templateMenuButton.cloneNode(true);
        instanceMenuCombat.innerHTML = "Combat";
        instanceMenuCombat.onclick = () => this.goToPage(this._mainScreen.getLabelCombat());
        // clicked first
        instanceMenuCombat.style.boxShadow = "0px 0px #555";
        instanceMenuCombat.style.backgroundColor = MainMenuGraphicComponent.BGC_CLICK();
        instanceMenuCombat.style.transform = "translate(2px, 4px)";
        this._instanceMenuCombat = instanceMenuCombat;
        const instanceMenuCollection = templateMenuButton.cloneNode(true);
        instanceMenuCollection.innerHTML = "Collection";
        instanceMenuCollection.onclick = () => this.goToPage(this._mainScreen.getLabelCollection());
        this._instanceMenuCollection = instanceMenuCollection;
        const instanceMenuOpening = templateMenuButton.cloneNode(true);
        instanceMenuOpening.innerHTML = "Opening";
        instanceMenuOpening.onclick = () => this.goToPage(this._mainScreen.getLabelOpening());
        this._instanceMenuOpening = instanceMenuOpening;
        const instanceMenuShop = templateMenuButton.cloneNode(true);
        instanceMenuShop.innerHTML = "Shop";
        instanceMenuShop.onclick = () => this.goToPage(this._mainScreen.getLabelShop());
        this._instanceMenuShop = instanceMenuShop;
        this._instanceContainer.appendChild(instanceMenuCombat);
        this._instanceContainer.appendChild(instanceMenuCollection);
        this._instanceContainer.appendChild(instanceMenuOpening);
        this._instanceContainer.appendChild(instanceMenuShop);
        __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_displayPanel).call(this, this._mainScreen.getLabelCombat());
    }
    internalLoop() {
        this.refreshOpeningTitle();
    }
    goToPage(label) {
        if (label != this._mainScreen.getCurrentPanel()) {
            let btnUnselected = __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_getBtnFromLabel).call(this, this._mainScreen.getCurrentPanel());
            __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_setAnimationBtn).call(this, btnUnselected, true);
            __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_displayPanel).call(this, label);
            let btnSelected = __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_getBtnFromLabel).call(this, label);
            __classPrivateFieldGet(this, _MainMenuGraphicComponent_instances, "m", _MainMenuGraphicComponent_setAnimationBtn).call(this, btnSelected);
        }
    }
    refreshOpeningTitle() {
        let booster = this._container.get(Booster.name);
        let text = "Opening";
        if (booster.getTotalNumberBoosterOwned() > 0) {
            text += " (" + booster.getTotalNumberBoosterOwned() + ")";
        }
        this._instanceMenuOpening.innerHTML = text;
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
_MainMenuGraphicComponent_instances = new WeakSet(), _MainMenuGraphicComponent_displayPanel = function _MainMenuGraphicComponent_displayPanel(name) {
    for (var panelKey in this._mainScreen.getPanelList()) {
        var currentPanel = this._mainScreen.getPanelList()[panelKey];
        if (panelKey == name) {
            console.debug("Display panel : " + name);
            currentPanel.style.display = "block";
            this._mainScreen.setCurrentPanel(name);
        }
        else {
            currentPanel.style.display = "none";
        }
    }
}, _MainMenuGraphicComponent_getBtnFromLabel = function _MainMenuGraphicComponent_getBtnFromLabel(label) {
    let e = null;
    switch (label) {
        case (this._mainScreen.getLabelCombat()):
            e = this._instanceMenuCombat;
            break;
        case (this._mainScreen.getLabelCollection()):
            e = this._instanceMenuCollection;
            break;
        case (this._mainScreen.getLabelOpening()):
            e = this._instanceMenuOpening;
            break;
        case (this._mainScreen.getLabelShop()):
            e = this._instanceMenuShop;
            break;
        default:
            return null;
    }
    return e;
}, _MainMenuGraphicComponent_setAnimationBtn = function _MainMenuGraphicComponent_setAnimationBtn(e, reverse = false) {
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
};
customElements.define('main-menu', MainMenuGraphicComponent);
export default MainMenuGraphicComponent;
//# sourceMappingURL=MainMenuGraphicComponent.js.map