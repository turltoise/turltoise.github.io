import Container from "../Container.js";

class AbstractGraphicComponent extends HTMLElement {
    protected _container: Container;
    protected _shadowRoot: ShadowRoot;
    protected _instanceContainer: HTMLElement;
 
	constructor(container: Container) {
        super();

        // attributs
        this._container = container;
        this._shadowRoot = this.attachShadow({mode: 'open'});
        
        // container for all component
        this._instanceContainer = this.buildContainer();

        // loop instantiation
        var self = this;
        setInterval(() => self.internalLoop(), AbstractGraphicComponent.MS_LOOP());
    }

    static MS_LOOP(): number {
        return 100;
    }

    getCurrentDocument(): Document {
        return document;
    }

	// to ovveride in children classes
    internalLoop(): void {
    	// here list methods
    }

	// for definee css class name
    getClassName(cssClass: string): string {
    	return this.constructor.name + "-" +cssClass;
    }

    buildContainer(): HTMLElement {
    	const templateContainer: HTMLElement = this.getCurrentDocument().createElement('div');
        templateContainer.setAttribute('class', this.getClassName('container'));
        const instanceContainer: HTMLElement = <HTMLElement> templateContainer.cloneNode(true);
        instanceContainer.onclick = () => this.onClickContainer();
        instanceContainer.style.boxSizing = "border-box";
        this._shadowRoot.appendChild(instanceContainer);
        return instanceContainer;
    }

    onClickContainer(): void {
    	console.debug("Click on " + this.getClassName('container'));
    }
}

export default AbstractGraphicComponent;