import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
class BodyGraphicComponent extends AbstractGraphicComponent {
    constructor(state, combatPanel, collectionPanel, openingPanel, shopPanel, chatComponent) {
        super(state);
        this._instanceContainer.style.margin = "40px";
        const templateSubContainerBody = this.getCurrentDocument().createElement('div');
        templateSubContainerBody.setAttribute('class', this.getClassName('sub-container'));
        templateSubContainerBody.style.display = "inline-block";
        templateSubContainerBody.style.verticalAlign = "top";
        templateSubContainerBody.style.width = "33.33%";
        this._templateSubContainerBody = templateSubContainerBody;
        const instanceSubContainerBodyLeft = this._templateSubContainerBody.cloneNode(true);
        instanceSubContainerBodyLeft.style.width = "66.66%";
        const instanceSubContainerBodyRight = this._templateSubContainerBody.cloneNode(true);
        this._instanceContainer.appendChild(instanceSubContainerBodyLeft);
        this._instanceContainer.appendChild(instanceSubContainerBodyRight);
        instanceSubContainerBodyLeft.appendChild(combatPanel);
        instanceSubContainerBodyLeft.appendChild(collectionPanel);
        instanceSubContainerBodyLeft.appendChild(openingPanel);
        instanceSubContainerBodyLeft.appendChild(shopPanel);
        instanceSubContainerBodyRight.appendChild(chatComponent);
    }
}
customElements.define('body-body', BodyGraphicComponent);
export default BodyGraphicComponent;
//# sourceMappingURL=BodyGraphicComponent.js.map