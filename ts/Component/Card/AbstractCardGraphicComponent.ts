import AbstractGraphicComponent from "../AbstractGraphicComponent.js";
import AbstractPrintableCard from "../../Game/Card/AbstractPrintableCard.js";
import Container from "../../Container.js";
import F from "../../Game/Tools/F.js";

class AbstractCardGraphicComponent extends AbstractGraphicComponent {
    protected _card: AbstractPrintableCard;
    protected _title: string;
    protected _img: string;
    protected _cardUUID: string;

    protected _actionNumber: number;
    protected _actionLoop: number;

    protected _instanceCardContainer: HTMLElement;
    protected _instanceCardImg: HTMLImageElement;
    protected _instanceLife: HTMLElement; 

    constructor(container: Container, card: AbstractPrintableCard) {
        super(container);
  
        this._card      = card;
        this._title     = card.getTitle();
        this._img       = card.getImg();
        this._cardUUID = card.getUUID();

        this._card.setCinematicText(AbstractCardGraphicComponent.IMG_STAND());
        this._actionNumber = 0;
        this._actionLoop = 0;

        const STYLE_PADDING = "5px";;

        this._instanceCardContainer = this.getCurrentDocument().createElement('div');
        this._instanceCardContainer.style.fontSize = "100%";
        this._instanceCardContainer.style.borderRadius = "5px";
        this._instanceCardContainer.style.padding = STYLE_PADDING;
        this._instanceCardContainer.style.width = "100px";
        this._instanceCardContainer.style.height = "150px";
        //this._instanceCardContainer.style.backgroundColor = "#EEAAEE"; // HERE WE WILL CHANGE WITH BACKGROUND IMG
        this._instanceCardContainer.style.border = "3px solid #AA00AA"; // HERE WE DEFINE BORDER COLOR
        this._instanceCardContainer.style.position = "relative";
        this._instanceCardContainer.style.textAlign = "left";
        this._instanceContainer.appendChild(this._instanceCardContainer);
 
        const templateHover = this.getCurrentDocument().createElement('div');
        templateHover.style.position = "absolute";
        templateHover.style.width    = "100%";
        templateHover.style.height   = "100%";
        templateHover.style.top      = "0";
        templateHover.style.left     = "0";

        const instanceCardTitle: HTMLElement = <HTMLElement> this.getCurrentDocument().createElement('div');
        instanceCardTitle.innerHTML = this._title;
        instanceCardTitle.style.fontSize = "12px";
        instanceCardTitle.style.textAlign = "center";
        instanceCardTitle.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        instanceCardTitle.style.color = "white";
        instanceCardTitle.style.padding = "2px";
        this._instanceCardContainer.appendChild(instanceCardTitle);

        this._instanceCardImg = <HTMLImageElement> this.getCurrentDocument().createElement('img');
        this._instanceCardImg.setAttribute('class', this.getClassName('img'));

        this._instanceCardImg.style.position = "absolute";
        this._instanceCardImg.style.bottom = "0%";
        this._instanceCardImg.style.left = "50%";
        this._instanceCardImg.style.transform = "translate(-50%, -20px)";
        console.log(this.constructor.name);
        if (this._card.isYours() && this.constructor.name == "CombatCardGraphicComponent") {
            this._instanceCardImg.style.transform = "translate(-50%, -20px) scaleX(-1)";
        }
        this._instanceCardContainer.appendChild(this._instanceCardImg);
    }

    internalLoop():void {
        this.#displayImg();
    }

    #displayImg():void {
        this._actionLoop += 1;
        if (AbstractGraphicComponent.MS_LOOP() * this._actionLoop >= 150 ) {
                this._instanceCardImg.src =  this.#computeImg();
                this._actionLoop = 0;
        }
    }

    #computeImg():string {
        this._actionNumber += 1;

        switch(this._card.getCinematicText()) {
            case AbstractCardGraphicComponent.IMG_DIE():
                if (this._actionNumber >= this._card.getCardGraphicSetting()._maxSpriteDie) {this._actionNumber = this._card.getCardGraphicSetting()._maxSpriteDie;}
                break;
            case AbstractCardGraphicComponent.IMG_STAND():
                if (this._actionNumber >= this._card.getCardGraphicSetting()._maxSpriteStand) {this._actionNumber = 0;}
                break;
            case AbstractCardGraphicComponent.IMG_HIT():
                if (this._actionNumber >= this._card.getCardGraphicSetting()._maxSpriteStand) {this._actionNumber = 0;}
                break;
            default:
                0;
        }
        return F.sprintf(
            'img/%s/%s_%s.png',
            this._img,
            this._card.getCinematicText(),
            this._actionNumber
        );
    }

    static IMG_DIE(): string {return "die1";}
    static IMG_HIT(): string {return "hit1";}
    static IMG_MOVE(): string {return "move";}
    static IMG_STAND(): string {return "stand";}
    static IMG_JUMP(): string {return "jump";}
}
export default AbstractCardGraphicComponent;