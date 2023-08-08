import Booster from "../Booster/Booster.js";
class CollectionCardGenerator {
    static generate(container, world) {
        let booster = container.get(Booster.name);
        let level = booster.getboosterAlreadyBoughtForWorld(world);
        let map = new Map();
        for (let pas = 0; pas < 3; pas++) {
            // reward list need to generate new UUID for each iteration
            let rewardList = new Map([...world.getHeroListByLevel(level), ...world.getItemListByLevel(level)]);
            let keys = Array.from(rewardList.keys());
            let card = rewardList.get(keys[Math.floor(Math.random() * keys.length)]);
            map.set(card.getUUID(), card);
        }
        return map; // TODO add rarity  on card
    }
}
export default CollectionCardGenerator;
//# sourceMappingURL=CollectionCardGenerator.js.map