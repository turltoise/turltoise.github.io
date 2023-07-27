import CollectionCard from "./CollectionCard.js";
class Item extends CollectionCard {
    constructor(container, rawCarac, level, title, img, capacities = new Map()) {
        super(container, rawCarac, level, title, img, capacities);
    }
}
export default Item;
//# sourceMappingURL=Item.js.map