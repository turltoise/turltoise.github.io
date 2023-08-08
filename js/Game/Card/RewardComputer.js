import AllWorldProgress from "../State/AllWorldProgress.js";
import Item from "./Item.js";
import ItemRarity from "./ItemRarity.js";
class RewardComputer {
    static generate(container, world) {
        let allWorldProgress = container.get(AllWorldProgress.name);
        let level = allWorldProgress.getMaxLevelReachForWorld(world.getName()) + 1;
        let map = new Map();
        for (let pas = 0; pas < 3; pas++) {
            // reward list need to generate new UUID for each iteration
            let rewardList = new Map([...world.getHeroListByLevel(level), ...world.getItemListByLevel(level)]);
            let keys = Array.from(rewardList.keys());
            let card = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
            if (card instanceof Item) {
                RewardComputer.addRarity(container, card);
            }
            map.set(card.getUUID(), card);
        }
        return map;
    }
    static addRarity(container, item) {
        let itemRarity = container.get(ItemRarity.name);
        let rarity = itemRarity.rollRarity();
        item.setRarity(rarity);
    }
}
export default RewardComputer;
//# sourceMappingURL=RewardComputer.js.map