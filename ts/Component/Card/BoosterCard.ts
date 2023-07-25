import Container from "../../Container.js";
import AbstractWorld from "../../Game/Adventure/World/AbstractWorld.js";
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";

class BoosterCard extends AbstractGraphicComponent {
    private _world: AbstractWorld;
    constructor(container: Container, world: AbstractWorld) {
        super(container);
        this._world = world;

        const templateBackground = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateBackground.style.backgroundColor = "pink";
        templateBackground.style.backgroundImage = "url(./img/world/" + this._world.getName() + ".jpg)";
        templateBackground.style.backgroundPosition = "-100%, -100%";
        templateBackground.style.backgroundSize = "300%";
        templateBackground.style.height = "150px";
        templateBackground.style.width = "100px";
        templateBackground.style.boxSizing = "border-box";
        templateBackground.style.margin = "0px";
        const instanceBackground : HTMLElement = <HTMLElement> templateBackground.cloneNode(true);

        const templateWatermark = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateWatermark.style.height = "150px";
        templateWatermark.style.width = "100px";
        templateWatermark.style.boxSizing = "border-box";
        templateWatermark.style.margin = "0px";
        templateWatermark.style.padding = "2px";
        templateWatermark.style.background = "linear-gradient(to left, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 5%,rgba(0, 0, 0, 0) 95%, rgba(0, 0, 0, 0.5) 100%)";
        const instanceWatermark : HTMLElement = <HTMLElement> templateWatermark.cloneNode(true);

        const templateSlip = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateSlip.style.height = "8px";
        templateSlip.style.width = "96px";
        templateSlip.style.padding = "0px";
        const instanceSlip1 : HTMLElement = <HTMLElement> templateSlip.cloneNode(true);
        const instanceSlip2 : HTMLElement = <HTMLElement> templateSlip.cloneNode(true);

        const templateRectangle = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateRectangle.style.display = "inline-block";
        templateRectangle.style.verticalAlign = "top";
        templateRectangle.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        templateRectangle.style.height = "6px";
        templateRectangle.style.width = "1px";
        templateRectangle.style.margin = "1px";
        for (let pas = 0; pas < 32; pas++) {
            let instanceRec1 : HTMLElement = <HTMLElement> templateRectangle.cloneNode(true);
            let instanceRec2 : HTMLElement = <HTMLElement> templateRectangle.cloneNode(true);

            instanceSlip1.appendChild(instanceRec1);
            instanceSlip2.appendChild(instanceRec2);
        }

        const templateMain = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateMain.style.height = "130px";
        templateMain.style.width = "96px";
        templateMain.style.textAlign = "center";
        const instanceMain : HTMLElement = <HTMLElement> templateMain.cloneNode(true);


        const templateContainerTitle = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateContainerTitle.style.height = "50px";
        templateContainerTitle.style.padding = "5px";
        templateContainerTitle.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        const instanceContainerTitle : HTMLElement = <HTMLElement> templateContainerTitle.cloneNode(true);

        const templateTitle = <HTMLElement> this.getCurrentDocument().createElement('div');
        templateTitle.style.height = "40px";
        templateTitle.style.lineHeight = "40px";
        const instanceTitle : HTMLElement = <HTMLElement> templateTitle.cloneNode(true);
        instanceTitle.innerHTML = this._world.getName();


        instanceWatermark.appendChild(instanceSlip1);
        instanceContainerTitle.appendChild(instanceTitle);
        instanceMain.appendChild(instanceContainerTitle);
        instanceWatermark.appendChild(instanceMain);
        instanceWatermark.appendChild(instanceSlip2);

        instanceBackground.appendChild(instanceWatermark);
        this._instanceContainer.appendChild(instanceBackground);
    }
}
customElements.define('booster-card', BoosterCard);
export default BoosterCard;