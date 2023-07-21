import Container from "../Container.js";
import State from "../Game/State/State.js";
import Store from "../Game/Store.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";

class StoreGraphicComponent extends AbstractGraphicComponent {
    private _store: Store;
    constructor(container: Container) {
        super(container);
        this._store = container.get('Store');

        this._instanceContainer.style.margin = "40px";

        const templateStoreStateButton = this.getCurrentDocument().createElement('div');
        templateStoreStateButton.setAttribute('class', this.getClassName('btn'));
        templateStoreStateButton.style.cursor = "pointer";
        templateStoreStateButton.style.display = "inline-block";
        templateStoreStateButton.style.margin = "5px";
        templateStoreStateButton.style.padding = "5px";
        templateStoreStateButton.style.backgroundColor = "#CCDDCC";
        templateStoreStateButton.style.caretColor = "transparent";
        templateStoreStateButton.style.borderRadius = "3px";

        const instanceSaveButton = <HTMLElement> templateStoreStateButton.cloneNode(true);
        instanceSaveButton.innerHTML = "SAVE";
        instanceSaveButton.onclick = () => this._store.save();
        const instanceLoadButton = <HTMLElement> templateStoreStateButton.cloneNode(true);
        instanceLoadButton.innerHTML = "LOAD";
        instanceLoadButton.onclick = () => this._store.load();
        const instanceDeleteButton = <HTMLElement> templateStoreStateButton.cloneNode(true);
        instanceDeleteButton.innerHTML = "DELETE";
        instanceDeleteButton.onclick = () => {if (window.confirm("Do you really want to delete ?")) {this._store.delete();}}

        this._instanceContainer.appendChild(instanceSaveButton);
        this._instanceContainer.appendChild(instanceLoadButton);
        this._instanceContainer.appendChild(instanceDeleteButton);
    }
}
customElements.define('store-store', StoreGraphicComponent);
export default StoreGraphicComponent;