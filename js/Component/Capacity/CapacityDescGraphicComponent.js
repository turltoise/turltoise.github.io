import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
class CapacityDescGraphicComponent extends AbstractGraphicComponent {
    constructor(container, capacity) {
        super(container);
        this._capacity = capacity;
        let instanceContainerName = this.getCurrentDocument().createElement('div');
        instanceContainerName.style.backgroundColor = "white";
        instanceContainerName.style.color = "#333";
        instanceContainerName.style.padding = "2px 4px";
        instanceContainerName.style.display = "inline-block";
        instanceContainerName.style.borderRadius = "2px";
        instanceContainerName.innerHTML = capacity.getName();
        this._instanceContainer.appendChild(instanceContainerName);
    }
}
customElements.define('capacity-desc', CapacityDescGraphicComponent);
export default CapacityDescGraphicComponent;
//# sourceMappingURL=CapacityDescGraphicComponent.js.map