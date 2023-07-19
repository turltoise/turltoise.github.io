import State from "../Game/State/State.js";
import Number from "../Game/Tools/Number.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";

class GoldIndicatorGraphicComponent extends AbstractGraphicComponent {
	private _instanceDisplay: HTMLElement;

	    constructor(state :State) {
        super(state);

		let keyframes = `
        @keyframes shinyGoldBefore {
            0%   {
                transform: translate(0, 0) skewX(-30deg);
                width: 1px;
            }

            30%  {
                transform: translate(270px, 0) skewX(-30deg);
                width: 80px;
            }

            100%  {
                transform: translate(270px, 0) skewX(-30deg);
                width: 80px;
            }
        }

        @keyframes shinyGoldAfter {
            0%   {
                transform: translate(0, 0) skewX(-30deg);
                width: 1px;
            }

            2%  {
                transform: translate(0, 0) skewX(-30deg);
                width: 1px;
            }

            100%  {
                transform: translate(270px, 0) skewX(-30deg);
                width: 80px;
            }
        }

        .`+this.getClassName('display')+`:before, 
        .`+this.getClassName('display')+`:after {
			content: " ";
			position:absolute;
		    top: 0;
		    left: -50px;
			background: rgba(250, 250, 250, 0.3);
			width: 50px;
			height: 100%;
  			animation-duration: 4s;
  			animation-iteration-count: infinite;
  			animation-timing-function: normal;
		}

		.`+this.getClassName('display')+`:before {
			animation-name: shinyGoldBefore;
		}

		.`+this.getClassName('display')+`:after {
			animation-name: shinyGoldAfter;
		}
        `;
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
        templateStyle.innerHTML = keyframes;
        this._instanceContainer.appendChild(templateStyle);

    		const templateDisplay = this.getCurrentDocument().createElement('div');
		    templateDisplay.setAttribute('class', this.getClassName('display'));
		    const instanceDisplay = <HTMLElement> templateDisplay.cloneNode(true);
		    instanceDisplay.innerHTML = Number.displayNumber(this._state.getResource().getGold()) + " GOLD";
		    instanceDisplay.style.boxSizing = "border-box";
		    instanceDisplay.style.backgroundColor = "#FDC911";
		    //instanceDisplay.style.padding = "10px";
		    //instanceDisplay.style.width = "150px";
		    instanceDisplay.style.fontWeight = "bold";
		    instanceDisplay.style.lineHeight = "40px";
		    instanceDisplay.style.height = "100%";
		    instanceDisplay.style.textAlign = "center";
		    
		    instanceDisplay.style.color = "#333";
		    instanceDisplay.style.position = "relative";
            this._instanceDisplay = instanceDisplay;


        	this._instanceContainer.appendChild(this._instanceDisplay);

        	this._instanceContainer.style.width = "150px";
        	this._instanceContainer.style.height = "40px";
        	this._instanceContainer.style.margin = "10px";
        	this._instanceContainer.style.backgroundColor = "red";
        	this._instanceContainer.style.borderRadius = "5px";
        	this._instanceContainer.style.overflow = "hidden";
        	this._instanceContainer.style.boxShadow = "6px 3px 3px #000";
        	this._instanceContainer.style.backgroundColor = "#FDC911";
        }

        internalLoop() {
            this._instanceDisplay.innerHTML = Number.displayNumber(this._state.getResource().getGold()) + " GOLD";
        }
}
customElements.define('gold-indicator', GoldIndicatorGraphicComponent);
export default GoldIndicatorGraphicComponent;
