import Container from "../../Container.js";
import Collection from "../CardManager/Collection.js";
import Hero from "./Hero.js";
import Item from "./Item.js";

class HeroItemLinker {

    static link(container: Container, hero: Hero, item: Item):boolean {
        if (hero.getItemMap().size >= Hero.getMaxItem()) {
            return false;
        }
        // remove from all hero
        let collection: Collection =  container.get(Collection.name);
        collection.getCardList().forEach((h: Hero) => {
            h.removeItemWithUUID(item.getUUID());
        });
        // add to currrent Hero
        hero.addItem(item);
        // replace hero link
        item.setHeroLinked(hero);
        return true;
    }

    static unlink(container: Container, hero: Hero, item: Item):boolean {
        // remove from all hero
        let collection: Collection =  container.get(Collection.name);
        collection.getCardList().forEach((h: Hero) => {
            h.removeItemWithUUID(item.getUUID());
        });
        // remove hero link
        item.removeHeroLinked();
        return true;
    }
}
export default HeroItemLinker;