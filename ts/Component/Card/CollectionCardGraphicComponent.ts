import Container from "../../Container.js";
import AbstractPrintableCard from "../../Game/Card/AbstractPrintableCard.js";
import Item from "../../Game/Card/Item.js";
import ItemRarity from "../../Game/Card/ItemRarity.js";
import AbstractCardGraphicComponent from "./AbstractCardGraphicComponent.js";

class CollectionCardGraphicComponent extends AbstractCardGraphicComponent {
    constructor(container:Container, card: AbstractPrintableCard) {
        super(container, card);

        if (card instanceof Item) {
            let rarity: ItemRarity = container.get(ItemRarity.name);
            let color: string = rarity.getColor(card.getRarity());
            this._instanceCardContainer.style.borderColor = color;
            this._instanceCardTitle.style.color = color;
        }
        
    }
}
customElements.define('collection-card', CollectionCardGraphicComponent);
export default CollectionCardGraphicComponent;
