import CollectionCard from "./CollectionCard.js";
class Item extends CollectionCard {
    constructor(rawCarac, level, title, img, capacities = new Map()) {
        super(rawCarac, level, title, img, capacities);
    }
}
export default Item;
//# sourceMappingURL=Item.js.map