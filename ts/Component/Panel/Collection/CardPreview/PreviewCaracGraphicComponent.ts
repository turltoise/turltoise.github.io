import Container from "../../../../Container.js";
import CollectionCard from "../../../../Game/Card/CollectionCard.js";
import AbstractGraphicComponent from "../../../AbstractGraphicComponent.js";

class PreviewCaracGraphicComponent extends AbstractGraphicComponent {
    constructor(container: Container, card: CollectionCard, name: string) {
        super(container);

        let nameWithoutSpace = name.replace(/\s+/g, '');
        let getter = 'get' + nameWithoutSpace;

        this._instanceContainer.style.width = "100%";
        this._instanceContainer.style.display = "inline-block";
        this._instanceContainer.style.display = "5px";
        this._instanceContainer.style.marginBottom = "8px";

        let instanceText = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceText);
        instanceText.style.display = "inline-block";
        instanceText.style.width = "80%";
        instanceText.style.textAlign = "left";
        instanceText.style.color = "#fff";
        instanceText.innerHTML = name;

        let instanceValue = this.getCurrentDocument().createElement('div');
        this._instanceContainer.appendChild(instanceValue);
        instanceValue.style.display = "inline-block";
        instanceValue.style.width = "20%";
        instanceValue.style.textAlign = "right";
        instanceValue.style.color="rgb(200, 230, 201)";
        instanceValue.style.fontWeight = "700";
        instanceValue.innerHTML = card[getter]();
    }
}
customElements.define('preview-carac', PreviewCaracGraphicComponent);
export default PreviewCaracGraphicComponent;