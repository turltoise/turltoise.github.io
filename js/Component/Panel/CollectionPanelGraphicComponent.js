import Chest from "../../Game/CardManager/Chest.js";
import Collection from "../../Game/CardManager/Collection.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import HeroPreviewGraphicComponent from "./Collection/HeroPreviewGraphicComponent.js";
import HeroListGraphicComponent from "./Collection/HeroListGraphicComponent.js";
import ItemListGraphicComponent from "./Collection/ItemListGraphicComponent.js";
import ItemPreviewGraphicComponent from "./Collection/ItemPreviewGraphicComponent.js";
class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    constructor(container) {
        super(container);
        const collection = this._container.get(Collection.name);
        const chest = this._container.get(Chest.name);
        this._currentHero = collection.getFirst();
        this._currentItem = chest.getFirst();
        this._instanceContainer.style.backgroundColor = "#1B5E20"; //"#0C5D20";//"#145f24";
        this._instanceContainer.style.backgroundImage = "url(./img/arches.png)";
        this._instanceContainer.style.padding = "10px";
        this._instanceContainer.style.textAlign = "center";
        this._instanceContainer.style.userSelect = "none";
        this._templateContainerCard = this.getCurrentDocument().createElement('div');
        this._templateContainerCard.setAttribute('class', this.getClassName('card-container'));
        this._templateContainerCard.style.backgroundColor = "#22AA33";
        this._templateContainerCard.style.borderRadius = "5px";
        this._templateContainerCard.style.display = "inline-block";
        this._templateContainerCard.style.margin = "5px";
        this._templateContainerCard.style.padding = "5px";
        let instancePreviewCard = this.getCurrentDocument().createElement('div');
        instancePreviewCard.style.display = "inline-block";
        instancePreviewCard.style.width = "40%";
        instancePreviewCard.style.verticalAlign = "top";
        this._instanceContainer.appendChild(instancePreviewCard);
        this._heroPreview = new HeroPreviewGraphicComponent(this._container, this._currentHero, this._templateContainerCard);
        this._itemPreview = new ItemPreviewGraphicComponent(this._container, this._currentItem, this._templateContainerCard);
        this._instancePreviewCardHero = this.getCurrentDocument().createElement('div');
        this._instancePreviewCardHero.style.marginBottom = "20px";
        this._instancePreviewCardItem = this.getCurrentDocument().createElement('div');
        this._instancePreviewCardHero.appendChild(this._heroPreview);
        this._instancePreviewCardItem.appendChild(this._itemPreview);
        instancePreviewCard.appendChild(this._instancePreviewCardHero);
        instancePreviewCard.appendChild(this._instancePreviewCardItem);
        const instanceColumn = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceColumn);
        instanceColumn.style.width = "1%";
        instanceColumn.style.display = "inline-block";
        const instanceContainerCollectionAndChest = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceContainerCollectionAndChest);
        instanceContainerCollectionAndChest.style.display = "inline-block";
        instanceContainerCollectionAndChest.style.width = "59%";
        instanceContainerCollectionAndChest.style.verticalAlign = "top";
        let heroList = new HeroListGraphicComponent(container, "Your Heroes", collection.getCardList(), this._templateContainerCard, this._instancePreviewCardHero, this);
        instanceContainerCollectionAndChest.appendChild(heroList);
        let itemList = new ItemListGraphicComponent(container, "Your Items", chest.getCardList(), this._templateContainerCard, this._instancePreviewCardItem, this);
        instanceContainerCollectionAndChest.appendChild(itemList);
    }
    showHeroPreview(container, hero) {
        container.innerHTML = "";
        this._currentHero = hero;
        let preview = new HeroPreviewGraphicComponent(this._container, hero, this._templateContainerCard);
        container.appendChild(preview);
    }
    showItemPreview(container, item) {
        container.innerHTML = "";
        let preview = new ItemPreviewGraphicComponent(this._container, item, this._templateContainerCard);
        container.appendChild(preview);
    }
    getCurrentHero() {
        return this._currentHero;
    }
}
customElements.define('collection-panel', CollectionPanelGraphicComponent);
export default CollectionPanelGraphicComponent;
//# sourceMappingURL=CollectionPanelGraphicComponent.js.map