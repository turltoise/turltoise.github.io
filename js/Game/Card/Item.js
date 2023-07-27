import CollectionCard from "./CollectionCard.js";
import UUID from "../Tools/UUID.js";
class Item extends CollectionCard {
    constructor(container, rawCarac, level, title, img, capacities = new Map(), cardGraphicSetting) {
        super(container, rawCarac, level, title, img, capacities, UUID.generateUUID(), cardGraphicSetting);
    }
}
export default Item;
//# sourceMappingURL=Item.js.map