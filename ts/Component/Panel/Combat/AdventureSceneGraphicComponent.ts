import RawCardLevelComputed from "../../../Game/Card/RawCardLevelComputed.js";
import AbstractGraphicComponent from "../../AbstractGraphicComponent.js";
import CardGraphicComponent from "../../CardGraphicComponent.js";

class AdventureSceneGraphicComponent extends AbstractGraphicComponent {
    private _templateContainerCard: HTMLElement;
    private _templateCardListView: HTMLElement;
    private _templateCardListViewTitle: HTMLElement;
    private _enemyTitle: HTMLElement;
    private _heroTitle: HTMLElement;
    private _interfaceEnemyView: HTMLElement;
    private _interfaceDeckView: HTMLElement;
 

    constructor(state) {
        super(state);

        const templateContainerCard = this.getCurrentDocument().createElement('div');
        templateContainerCard.setAttribute('class', this.getClassName('container-card'));
        //templateContainerCard.style.backgroundColor = "#88AA33";
        templateContainerCard.style.display = "inline-block";
        templateContainerCard.style.margin = "5px";
        templateContainerCard.style.padding = "5px";
        this._templateContainerCard = templateContainerCard;

        const templateCardListView = this.getCurrentDocument().createElement('div');
        templateCardListView.style.backgroundColor = "rgba(255,255,255, 0.4)";
        templateCardListView.style.margin = "10px";
        templateCardListView.style.marginBottom = "20px";
        templateCardListView.style.padding = "10px";
        templateCardListView.style.boxSizing = "border-box";
        this._templateCardListView = templateCardListView;

        const templateCardListViewTitle = this.getCurrentDocument().createElement('div');
        templateCardListViewTitle.style.color = "white";
        templateCardListViewTitle.style.fontWeight = "bold";
        templateCardListViewTitle.style.display = "inline-block";
        templateCardListViewTitle.style.height = "180px";
        templateCardListViewTitle.style.width = "60px";
        templateCardListViewTitle.style.lineHeight = "180px";
        templateCardListViewTitle.style.verticalAlign = "middle";
        this._templateCardListViewTitle = templateCardListViewTitle;
        this.render();
    }

    render() {

        this._enemyTitle = <HTMLElement> this._templateCardListViewTitle.cloneNode(true);
        this._enemyTitle.innerHTML = "Enemy";

        this._heroTitle = <HTMLElement> this._templateCardListViewTitle.cloneNode(true);
        this._heroTitle.innerHTML = "Deck";

        this._interfaceEnemyView = <HTMLElement> this._templateCardListView.cloneNode(true);
        this._interfaceEnemyView.setAttribute('class', this.getClassName('enemy-view'))
        this._interfaceEnemyView.style.height= "200px";
        this._interfaceEnemyView.setAttribute('id', AdventureSceneGraphicComponent.ID_ENEMY_VIEW());

        this._interfaceDeckView = <HTMLElement> this._templateCardListView.cloneNode(true);
        this._interfaceDeckView.setAttribute('class', this.getClassName('deck-view'));
        this._interfaceDeckView.style.height= "200px";
        this._interfaceDeckView.setAttribute('id', AdventureSceneGraphicComponent.ID_DECK_VIEW());

        this._interfaceEnemyView.appendChild(this._enemyTitle);
        this._interfaceDeckView.appendChild(this._heroTitle);

        this._instanceContainer.appendChild(this._interfaceEnemyView);
        this._instanceContainer.appendChild(this._interfaceDeckView);
    }

    internalLoop() {
        this.#updateDeckCardList();  
        this.#updateCurrentEnemy();
    }

    #updateCurrentEnemy() {
        const currentEnemy = this._state.getCurrentEnemy();
        const graphicCardList = this._shadowRoot.querySelectorAll("#"+ AdventureSceneGraphicComponent.ID_ENEMY_VIEW() +" card-card");
        if (currentEnemy) {
            let displayNew = true;
            
            graphicCardList.forEach((gCard: CardGraphicComponent) => {
                if (currentEnemy.getUUID() != gCard.getCardUUID()) {
                    gCard.parentElement.remove();
                    displayNew = true;
                } else {
                    displayNew = false;
                }
            });
            if (displayNew) {
                const instanceCombatPanel = this._shadowRoot.querySelectorAll("#" + AdventureSceneGraphicComponent.ID_ENEMY_VIEW())[0];
                const instanceContainerCard = this._templateContainerCard.cloneNode(true);
                const graphicCard = new CardGraphicComponent(this._state, currentEnemy.getMainRawCard());
                instanceContainerCard.appendChild(graphicCard);
                this._interfaceEnemyView.appendChild(instanceContainerCard);
            }
        } else {
            graphicCardList.forEach((gCard: CardGraphicComponent) => {
                gCard.parentElement.remove();
            });
        }
    }

    #updateDeckCardList() {
        const cardList = new Map(this._state.getCardDeckList());

        // Remove all card not in deck but displayed in panel combat
        const graphicCardList = this._shadowRoot.querySelectorAll("#"+ AdventureSceneGraphicComponent.ID_DECK_VIEW() +" card-card");
        // loop on graphic card
        graphicCardList.forEach((gCard: CardGraphicComponent) => {
            if (!cardList.has(gCard.getCardUUID())) {
                gCard.parentElement.remove();
            } else {
                // already here we will not delete to recreate after
                cardList.delete(gCard.getCardUUID());
            }
        });

        // Add all card in deck but not in panel combat
        const instanceCombatPanel = this._shadowRoot.querySelectorAll("#" + AdventureSceneGraphicComponent.ID_DECK_VIEW())[0];
        // loop on non graphic card
        cardList.forEach((card: RawCardLevelComputed, uuid) => {
            const instanceContainerCard = this._templateContainerCard.cloneNode(true);
            const graphicCard = new CardGraphicComponent(this._state, card);
            instanceContainerCard.appendChild(graphicCard);
            this._interfaceDeckView.appendChild(instanceContainerCard);
        });
    }

    static ID_DECK_VIEW() { return "id-deck-view";}
    static ID_ENEMY_VIEW() { return "id-enemy-view";}

}
customElements.define('adventure-adventure', AdventureSceneGraphicComponent);
export default AdventureSceneGraphicComponent;