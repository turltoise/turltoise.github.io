import State from "../../Game/State/State.js";
import AbstractGraphicComponent from "../AbstractGraphicComponent.js";

class AbstractPanelGraphicComponent extends AbstractGraphicComponent {
	constructor(state: State) {
        super(state);

        //this._instanceContainer.style.backgroundColor = "red";
        this._instanceContainer.style.minHeight = "540px";

    }
}
export default AbstractPanelGraphicComponent;
