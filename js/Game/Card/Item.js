import CollectionCard from "./CollectionCard.js";
class Item extends CollectionCard {
    constructor(container, rawCarac, level, title, img, capacities = new Map(), cardGraphicSetting, uuid) {
        super(container, rawCarac, level, title, img, capacities, uuid, cardGraphicSetting);
        this._heroLinked = null;
    }
    isItem() { return true; }
    isHeroLinked() { return (this._heroLinked) ? true : false; }
    getHeroLinked() { return this._heroLinked; }
    removeHeroLinked() { this._heroLinked = null; }
    setHeroLinked(hero) { this._heroLinked = hero; }
}
export default Item;
//# sourceMappingURL=Item.js.map