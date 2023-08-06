import Collection from "../CardManager/Collection.js";
import Hero from "./Hero.js";
class HeroItemLinker {
    static link(container, hero, item) {
        if (hero.getItemMap().size >= Hero.getMaxItem()) {
            return false;
        }
        // remove from all hero
        let collection = container.get(Collection.name);
        collection.getCardList().forEach((h) => {
            h.removeItemWithUUID(item.getUUID());
        });
        // add to currrent Hero
        hero.addItem(item);
        // replace hero link
        item.setHeroLinked(hero);
        return true;
    }
    static unlink(container, hero, item) {
        // remove from all hero
        let collection = container.get(Collection.name);
        collection.getCardList().forEach((h) => {
            h.removeItemWithUUID(item.getUUID());
        });
        // remove hero link
        item.removeHeroLinked();
        return true;
    }
}
export default HeroItemLinker;
//# sourceMappingURL=HeroItemLinker.js.map