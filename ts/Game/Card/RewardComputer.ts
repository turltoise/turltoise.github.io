import Container from "../../Container.js";
import AbstractWorld from "../Adventure/World/AbstractWorld.js";
import AllWorldProgress from "../State/AllWorldProgress.js";
import CollectionCard from "./CollectionCard.js";
import Item from "./Item.js";
import ItemRarity from "./ItemRarity.js";

class RewardComputer {
    static generate(container:Container, world: AbstractWorld): Map<string, CollectionCard> {
        let allWorldProgress: AllWorldProgress = container.get(AllWorldProgress.name);
        let level: number = allWorldProgress.getMaxLevelReachForWorld(world.getName()) + 1;
        let map = new Map();
        for (let pas = 0; pas < 3; pas++) {
            // reward list need to generate new UUID for each iteration
            let rewardList = <Map<string, CollectionCard>> new Map([...world.getHeroListByLevel(level), ...world.getItemListByLevel(level)]);
            let keys = Array.from(rewardList.keys());
		    let card: CollectionCard = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
            if (card instanceof Item) {
                RewardComputer.addRarity(container, card);
            }
            map.set(card.getUUID(), card);
        }
        return map;
    }

    static addRarity(container: Container, item: Item) {
        let itemRarity: ItemRarity = container.get(ItemRarity.name);
        let rarity: string = itemRarity.rollRarity();
        item.setRarity(rarity);
    }
}
export default RewardComputer;
