import Item from "../../Game/Card/Item.js";
import ItemRarity from "../../Game/Card/ItemRarity.js";
import AbstractCardGraphicComponent from "./AbstractCardGraphicComponent.js";
class CollectionCardGraphicComponent extends AbstractCardGraphicComponent {
    constructor(container, card) {
        super(container, card);
        if (card instanceof Item) {
            let rarity = container.get(ItemRarity.name);
            let color = rarity.getColor(card.getRarity());
            this._instanceCardContainer.style.borderColor = color;
            this._instanceCardTitle.style.color = color;
        }
    }
}
customElements.define('collection-card', CollectionCardGraphicComponent);
export default CollectionCardGraphicComponent;
//# sourceMappingURL=CollectionCardGraphicComponent.js.map