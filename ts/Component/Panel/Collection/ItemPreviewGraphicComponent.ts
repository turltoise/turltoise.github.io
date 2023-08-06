import Container from "../../../Container.js";
import Item from "../../../Game/Card/Item.js";
import AbstractCapacity from "../../../Game/Fight/Capacity/List/AbstractCapacity.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CollectionCardGraphicComponent from "../../Card/CollectionCardGraphicComponent.js";
import PreviewCaracGraphicComponent from "./CardPreview/PreviewCaracGraphicComponent.js";

class ItemPreviewGraphicComponent extends AbstractGraphicComponent {
    private _card: Item;
    private _itemListContainer: HTMLElement;
    private _templateContainerCard: HTMLElement;

    constructor(container: Container, card: Item, templateContainerCard: HTMLElement) {
        super(container);
        this._card = card;
        this._templateContainerCard = templateContainerCard;

        this._instanceContainer.style.width = "100%";
        this._instanceContainer.style.background = "linear-gradient(110deg, #388E3C 60%, #4CAF50 60%)";
        this._instanceContainer.style.display = "inline-block";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.padding = "10px";
        this._instanceContainer.style.borderRadius = "5px";
        
        let instanceTitlePreview = this.getCurrentDocument().createElement('div');
        instanceTitlePreview.innerHTML = "Item sheet";
        instanceTitlePreview.style.fontSize = "20px";
        instanceTitlePreview.style.textAlign = "left";
        instanceTitlePreview.style.marginBottom = "5px";
        instanceTitlePreview.style.fontWeight = "bold";
        instanceTitlePreview.style.color = "white";
        
        let instanceContainerMainData = this.getCurrentDocument().createElement('div');
        instanceContainerMainData.style.width = "45%";
        instanceContainerMainData.style.display = "inline-block";
        instanceContainerMainData.style.verticalAlign = "middle";

        let instanceContainerCenter = this.getCurrentDocument().createElement('div');
        instanceContainerCenter.style.width = "10%";
        instanceContainerCenter.style.display = "inline-block";
        instanceContainerCenter.style.verticalAlign = "middle";

        let instanceContainerSecondaryData = this.getCurrentDocument().createElement('div');
        instanceContainerSecondaryData.style.width = "45%";
        instanceContainerSecondaryData.style.display = "inline-block";
        instanceContainerSecondaryData.style.verticalAlign = "middle";

        let templateTitleRubric = this.getCurrentDocument().createElement('div');
        templateTitleRubric.style.fontSize = "16px";
        templateTitleRubric.style.textAlign = "left";
        templateTitleRubric.style.marginBottom = "5px";
        templateTitleRubric.style.fontWeight = "bold";
        templateTitleRubric.style.color = "white";
        templateTitleRubric.style.padding = "5px 0px";
        templateTitleRubric.style.boxShadow = "0px 2px rgba(255,255,255,0.8)";

        let instanceTitleCapacities = <HTMLElement> templateTitleRubric.cloneNode(true);
        instanceTitleCapacities.innerHTML = "Capacities";
        let instanceContainerCapacities = this.getCurrentDocument().createElement('div');
        instanceContainerCapacities.style.textAlign = "left";
        instanceContainerCapacities.style.marginBottom = "5px";

        this._instanceContainer.appendChild(instanceTitlePreview);
        this._instanceContainer.appendChild(instanceContainerMainData);
        this._instanceContainer.appendChild(instanceContainerCenter);
        this._instanceContainer.appendChild(instanceContainerSecondaryData);
        

        let instanceCardontainer = this.getCurrentDocument().createElement('div');
        instanceCardontainer.style.display  = "inline-block";
        instanceCardontainer.style.marginTop = "5px";
        const graphicCard: CollectionCardGraphicComponent = new CollectionCardGraphicComponent(this._container, this._card);
        instanceCardontainer.appendChild(graphicCard);
     
        instanceContainerMainData.appendChild(instanceCardontainer);
        let instanceHackCardInMiddle = this.getCurrentDocument().createElement('div');
        instanceHackCardInMiddle.style.height = "5px";
        instanceHackCardInMiddle.style.width = "100%";
        instanceContainerMainData.appendChild(instanceHackCardInMiddle);
        
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Strength'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Dexterity'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Intelligence'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Luck'));
 
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Damage'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Critical Rate'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Physical Critical Number'));

        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Damage'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Critical Rate'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Magic Critical Number'));

        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Fire Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Water Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Plant Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Necromancy Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Necromancy Resistance'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Armor'));
    
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Accuracy'));
        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Escape'));

        instanceContainerSecondaryData.appendChild(new PreviewCaracGraphicComponent(container, this._card, 'Life'));

        this._card.getCapacities().forEach((capacity: AbstractCapacity) => {
            let capacityContainer = <HTMLElement> this.getCurrentDocument().createElement('div');
            capacityContainer.appendChild(capacity.getGraphic());
            instanceContainerCapacities.appendChild(capacityContainer);
        });
        instanceContainerMainData.appendChild(instanceTitleCapacities);
        instanceContainerMainData.appendChild(instanceContainerCapacities);
    }
}
customElements.define('item-preview', ItemPreviewGraphicComponent);
export default ItemPreviewGraphicComponent;