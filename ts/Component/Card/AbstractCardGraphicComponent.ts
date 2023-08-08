import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
import AbstractPrintableCard from "../../Game/Card/AbstractPrintableCard.js";
import Container from "../../Container.js";
import F from "../../Game/Tools/F.js";
import SpriteManager from "./SpriteManager.js";

class AbstractCardGraphicComponent extends AbstractGraphicComponent {
    protected _card: AbstractPrintableCard;
    protected _title: string;
    protected _img: string;
    protected _cardUUID: string;

    protected _actionLoop: number;

    protected _instanceCardContainer: HTMLElement;
    protected _instanceCardImg: HTMLImageElement;
    protected _instanceLife: HTMLElement; 
    protected _instanceCardTitle: HTMLElement;

    constructor(container: Container, card: AbstractPrintableCard) {
        super(container);
  
        this._card      = card;
        this._title     = card.getTitle();
        this._img       = card.getImg();
        this._cardUUID = card.getUUID();

        this._card.setCombatSpriteText(SpriteManager.IMG_STAND());
        this._card.resetCombatSpriteIndex();
        this._card.resetCombatSpriteTimeCounter();

        this._actionLoop = 0;

        const STYLE_PADDING = "5px";

        this._instanceCardContainer = this.getCurrentDocument().createElement('div');
        this._instanceCardContainer.style.fontSize = "100%";
        this._instanceCardContainer.style.borderRadius = "5px";
        this._instanceCardContainer.style.padding = STYLE_PADDING;
        this._instanceCardContainer.style.width = "100px";
        this._instanceCardContainer.style.height = "150px";
        this._instanceCardContainer.style.border = "3px solid #333"; // HERE WE DEFINE BORDER COLOR
        this._instanceCardContainer.style.position = "relative";
        this._instanceCardContainer.style.textAlign = "left";
        this._instanceContainer.appendChild(this._instanceCardContainer);
 
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width    = "100%";
        templateHover.style.height   = "100%";
        templateHover.style.top      = "0";
        templateHover.style.left     = "0";

        this._instanceCardTitle = <HTMLElement> this.getCurrentDocument().createElement('div');
        this._instanceCardTitle.innerHTML = this._title + "<br>Lvl " + this._card.getLevel();
        this._instanceCardTitle.style.fontSize = "12px";
        this._instanceCardTitle.style.textAlign = "center";
        this._instanceCardTitle.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        this._instanceCardTitle.style.color = "white";
        this._instanceCardTitle.style.padding = "2px";
        this._instanceCardContainer.appendChild(this._instanceCardTitle);

        this._instanceCardImg = <HTMLImageElement> this.getCurrentDocument().createElement('img');
        this._instanceCardImg.setAttribute('class', this.getClassName('img'));

        this._instanceCardImg.style.position = "absolute";
        this._instanceCardImg.style.bottom = "0%";
        this._instanceCardImg.style.left = "50%";
        let translate = F.sprintf(
            'translate(%s, %s)',
            card.getCardGraphicSetting()._xSprite,
            card.getCardGraphicSetting()._ySprite
        );
        this._instanceCardImg.style.transform = translate;
        if (card.getCardGraphicSetting()._maxHeight) {
            this._instanceCardImg.style.maxHeight = card.getCardGraphicSetting()._maxHeight;
        }
        if (card.getCardGraphicSetting()._maxWidth) {
            this._instanceCardImg.style.maxWidth = card.getCardGraphicSetting()._maxWidth;
        }
        if (this._card.isYours() && this.constructor.name == "CombatCardGraphicComponent") {
            this._instanceCardImg.style.transform = translate + " scaleX(-1)";
        }
        this._instanceCardContainer.appendChild(this._instanceCardImg);

        this.#setDefaultImg();
    }

    internalLoop():void {
        this.#displayImg();
    }

    #setDefaultImg(): void {
        if (this._card.isItem()) {
            let srcImage = F.sprintf(
                'img/%s',
                this._img
            );
            this._instanceCardImg.src = srcImage;
        } else {
            this._actionLoop = 0;
            let imgUrl = this.#computeSprite();
            if (this._card.getCombatSpriteIndex() > -1) {
                this._instanceCardImg.src = imgUrl;
            }
        }
    }

    #displayImg():void {
        if (this._card.isItem()) {
            let srcImage = F.sprintf(
                'img/%s',
                this._img
            );
            this._instanceCardImg.src = srcImage;
        } else {
            this._actionLoop += 1;
            if (AbstractGraphicComponent.MS_LOOP() * this._actionLoop >= 150 ) {
                    let imgUrl = this.#computeSprite();
                    if (this._card.getCombatSpriteIndex() > -1) {
                        this._instanceCardImg.src = imgUrl;
                    }
                    this._actionLoop = 0;
            }
        }
    }

    #computeSprite():string {
        let spriteManager: SpriteManager = this._container.get(SpriteManager.name);
        spriteManager.compute(this._card);
        return F.sprintf(
            'img/%s/%s_%s.png',
            this._img,
            this._card.getCombatSpriteText(),
            this._card.getCombatSpriteIndex()
        );
    }
}
export default AbstractCardGraphicComponent;