import Container from "../../../Container.js";
import StackPlayCard from "../../../Game/Card/StackPlayCard.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CombatCardGraphicComponent from "../../Card/CombatCardGraphicComponent.js";

class AdventureSceneGraphicComponent extends AbstractGraphicComponent {
    private _templateContainerCard: HTMLElement;
    private _templateCardListView: HTMLElement;
    private _interfaceEnemyView: HTMLElement;
    private _interfaceDeckView: HTMLElement;

    constructor(container: Container) {
        super(container);

        const templateContainerCard = this.getCurrentDocument().createElement('div');
        templateContainerCard.setAttribute('class', this.getClassName('container-card'));
        //templateContainerCard.style.backgroundColor = "#88AA33";
        templateContainerCard.style.display = "inline-block";
        templateContainerCard.style.verticalAlign = "top";
        //templateContainerCard.style.margin = "5px";
        templateContainerCard.style.padding = "5px";
        this._templateContainerCard = templateContainerCard;

        const templateCardListView = this.getCurrentDocument().createElement('div');
        //templateCardListView.style.marginBottom = "20px";
        templateCardListView.style.padding = "10px";
        templateCardListView.style.boxSizing = "border-box";
        templateCardListView.style.height = "200px";
        this._templateCardListView = templateCardListView;

        this.render();
    }

    render() {

        this._interfaceEnemyView = <HTMLElement> this._templateCardListView.cloneNode(true);
        this._interfaceEnemyView.setAttribute('class', this.getClassName('enemy-view'))
        this._interfaceEnemyView.style.height = "210px";
        this._interfaceEnemyView.style.textAlign = "right";
        this._interfaceEnemyView.style.backgroundPosition = "bottom 0px right 0px";
        this._interfaceEnemyView.style.backgroundImage = "url(./img/world/Meadow_platform.png)";
        this._interfaceEnemyView.style.backgroundRepeat = "no-repeat";
        this._interfaceEnemyView.setAttribute('id', AdventureSceneGraphicComponent.ID_ENEMY_VIEW());

        this._interfaceDeckView = <HTMLElement> this._templateCardListView.cloneNode(true);
        this._interfaceDeckView.setAttribute('class', this.getClassName('deck-view'));
        this._interfaceDeckView.style.height = "300px";
        this._interfaceDeckView.style.backgroundPosition = "bottom 0px right 0px";
        this._interfaceDeckView.style.backgroundImage = "url(./img/world/Meadow_ground.png)";
        this._interfaceDeckView.style.backgroundRepeat = "no-repeat";
        this._interfaceDeckView.setAttribute('id', AdventureSceneGraphicComponent.ID_DECK_VIEW());

        this._instanceContainer.appendChild(this._interfaceEnemyView);
        this._instanceContainer.appendChild(this._interfaceDeckView);
    }

    cleanHeroCards() {
        this._interfaceDeckView.innerHTML = "";
    }

    cleanEnemyCards() {
        this._interfaceEnemyView.innerHTML = "";
    }

    displayHeroCards(heroList: Map<string, StackPlayCard>) {
        this.#displayCard(heroList, this._interfaceDeckView);
    }

    displayEnemyCards(enemyList: Map<string, StackPlayCard>) {
        this.#displayCard(enemyList, this._interfaceEnemyView);
    }

    #displayCard(cardList: Map<string, StackPlayCard>, interfaceView: HTMLElement) {
        const self = this;
        cardList.forEach((card: StackPlayCard) => {
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            instanceContainerCard.appendChild(new CombatCardGraphicComponent(self._container, card));
            interfaceView.appendChild(instanceContainerCard);
        });
    }

    static ID_DECK_VIEW() { return "id-deck-view";}
    static ID_ENEMY_VIEW() { return "id-enemy-view";}
}
customElements.define('adventure-adventure', AdventureSceneGraphicComponent);
export default AdventureSceneGraphicComponent;