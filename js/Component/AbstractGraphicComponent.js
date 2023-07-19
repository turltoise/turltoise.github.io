class AbstractGraphicComponent extends HTMLElement {
    constructor(state) {
        super();
        // attributs
        this._state = state;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        // container for all component
        this._instanceContainer = this.buildContainer();
        // loop instantiation
        var self = this;
        setInterval(() => self.internalLoop(), AbstractGraphicComponent.MS_LOOP());
    }
    static MS_LOOP() {
        return 20;
    }
    getCurrentDocument() {
        return document;
    }
    // to ovveride in children classes
    internalLoop() {
        // here list methods
    }
    // for definee css class name
    getClassName(cssClass) {
        return this.constructor.name + "-" + cssClass;
    }
    buildContainer() {
        const templateContainer = this.getCurrentDocument().createElement('div');
        templateContainer.setAttribute('class', this.getClassName('container'));
        const instanceContainer = templateContainer.cloneNode(true);
        instanceContainer.onclick = () => this.onClickContainer();
        instanceContainer.style.boxSizing = "border-box";
        this._shadowRoot.appendChild(instanceContainer);
        return instanceContainer;
    }
    onClickContainer() {
        if (this._state.getDebug()) {
            console.debug("Click on " + this.getClassName('container'));
        }
    }
}
export default AbstractGraphicComponent;
//# sourceMappingURL=AbstractGraphicComponent.js.map