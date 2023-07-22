import Container from "../Container.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
import ChatGraphicComponent from "./ChatGraphicComponent.js";
import CollectionPanelGraphicComponent from "./Panel/CollectionPanelGraphicComponent.js";
import CombatPanelGraphicComponent from "./Panel/CombatPanelGraphicComponent.js";
import OpeningPanelGraphicComponent from "./Panel/OpeningPanelGraphicComponent.js";
import ShopPanelGraphicComponent from "./Panel/ShopPanelGraphicComponent.js";

class BodyGraphicComponent extends AbstractGraphicComponent {

    private _templateSubContainerBody: HTMLElement;

	constructor(container: Container) {
        super(container);

        const combatPanel: CombatPanelGraphicComponent = container.get(CombatPanelGraphicComponent.name);
		const collectionPanel: CollectionPanelGraphicComponent = container.get(CollectionPanelGraphicComponent.name);
		const openingPanel: OpeningPanelGraphicComponent = container.get(OpeningPanelGraphicComponent.name);
		const shopPanel: ShopPanelGraphicComponent = container.get(ShopPanelGraphicComponent.name);
		const chatComponent: ChatGraphicComponent = container.get(ChatGraphicComponent.name);

        this._instanceContainer.style.margin = "40px";

        const templateSubContainerBody = this.getCurrentDocument().createElement('div');
        templateSubContainerBody.setAttribute('class', this.getClassName('sub-container'));
        templateSubContainerBody.style.display = "inline-block";
        templateSubContainerBody.style.verticalAlign = "top";
        templateSubContainerBody.style.width = "33.33%";
        this._templateSubContainerBody = templateSubContainerBody;

        const instanceSubContainerBodyLeft: HTMLElement = <HTMLElement> this._templateSubContainerBody.cloneNode(true);
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