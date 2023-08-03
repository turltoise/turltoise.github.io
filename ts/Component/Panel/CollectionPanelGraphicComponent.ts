import Container from "../../Container.js";
import CollectionCard from "../../Game/Card/CollectionCard.js";
import Chest from "../../Game/CardManager/Chest.js";
import Collection from "../../Game/CardManager/Collection.js";
import AbstractPanelGraphicComponent from "./AbstractPanelGraphicComponent.js";
import CardListGraphicComponent from "./Collection/CardListGraphicComponent.js";
import CardPreviewGraphicComponent from "./Collection/CardPreviewGraphicComponent.js";

class CollectionPanelGraphicComponent extends AbstractPanelGraphicComponent {
    private _templateContainerCard: HTMLElement;
    private _cardPreview: HTMLElement;
    private _instancePreviewCard: HTMLElement;

    constructor(container : Container) {
        super(container);
        const collection: Collection = this._container.get(Collection.name);
        const chest: Chest = this._container.get(Chest.name);

        this._instanceContainer.style.backgroundColor = "#1B5E20";//"#0C5D20";//"#145f24";
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

        this._instancePreviewCard = this.getCurrentDocument().createElement('div');
        this._instancePreviewCard.style.display = "inline-block";
        this._instancePreviewCard.style.width = "40%";
        this._instancePreviewCard.style.verticalAlign = "top";
        this._instanceContainer.appendChild(this._instancePreviewCard);
        this._cardPreview = new CardPreviewGraphicComponent(this._container, collection.getFirst());
        this._instancePreviewCard.appendChild(this._cardPreview);

        const instanceColumn = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceColumn);
        instanceColumn.style.width = "1%";
        instanceColumn.style.display = "inline-block";

        const instanceContainerCollectionAndChest = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceContainerCollectionAndChest);
        instanceContainerCollectionAndChest.style.display = "inline-block";
        instanceContainerCollectionAndChest.style.width = "59%";
        instanceContainerCollectionAndChest.style.verticalAlign = "top";

        let heroList = new CardListGraphicComponent(
            container,
            "Your Heroes",
            collection.getCardList(),
            this._templateContainerCard,
            this._instancePreviewCard,
            this
        );
        instanceContainerCollectionAndChest.appendChild(heroList);
        let itemList = new CardListGraphicComponent(
            container,
            "Your Items",
            chest.getCardList(),
            this._templateContainerCard,
            this._instancePreviewCard,
            this
        );
        instanceContainerCollectionAndChest.appendChild(itemList);
    }

    showPreview(container:HTMLElement, card: CollectionCard) {
        container.innerHTML = "";
        let preview = new CardPreviewGraphicComponent(this._container, card);
        container.appendChild(preview);
    }
}
customElements.define('collection-panel', CollectionPanelGraphicComponent);
export default CollectionPanelGraphicComponent;