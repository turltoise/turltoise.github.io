import ChatMessage from "../Game/Chat/ChatMessage.js";
import State from "../Game/State/State.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";

class ChatGraphicComponent extends AbstractGraphicComponent {
    private _templateMessage: HTMLElement;
    private _anchor: HTMLElement;
    private _templateTitleMessage: HTMLElement;
    private _instanceTitleMessage: HTMLElement;
    private _templateContainerMessage: HTMLElement;
    private _instanceContainerMessage: HTMLElement;
    private _instanceMessage: HTMLElement;

    constructor(state: State) {
        super(state);

        const self = this;
        setInterval(() => self.internalLoop(), 20);

        let  style = `
        .message-box {
          font-family: "Arial Narrow", Arial, sans-serif;
        }
        /* Combat message */
        .message-combat-primary {
          color: #eee;
        }

        .message-combat-secondary {
          color: #999;
        }

        .message-hero-target {
          color: #bbdefb;
          font-weight: 900;
        }

        .message-enemy-target {
          color: #cb3974;
          font-weight: 900;
        }

        .message-combat-skill {
          font-style: italic;
        }
        `;
        let templateStyle = this.getCurrentDocument().createElement( 'style' );
        templateStyle.innerHTML = style;
        this._instanceContainer.appendChild(templateStyle);

        const templateMessage = this.getCurrentDocument().createElement('div');
        this._templateMessage = templateMessage;
        this._templateMessage.style.width = "calc(100% - 2x2px)";
        //this._templateMessage.style.borderBottom = "1px solid #CB742D";
        this._templateMessage.style.backgroundColor = "rgba(0,10,68,0.8)";
        this._templateMessage.style.margin = "2px";
        this._templateMessage.style.padding = "5px";

        const anchor = this.getCurrentDocument().createElement('div');
        anchor.style.overflowAnchor = "auto";
        anchor.style.height = "1px";
        this._anchor = anchor;

        const templateTitleMessage = <HTMLElement> this.getCurrentDocument().createElement('div');
        this._templateTitleMessage = templateTitleMessage;
        this._instanceTitleMessage = <HTMLElement> this._templateTitleMessage.cloneNode(true);
        this._instanceTitleMessage.innerHTML = "History";
        this._instanceTitleMessage.style.fontWeight = "bold";
        this._instanceTitleMessage.style.fontSize = "30px";
        this._instanceTitleMessage.style.height = "50px";
        this._instanceTitleMessage.style.lineHeight = "50px";
        this._instanceTitleMessage.style.marginLeft = "10px";
        this._instanceContainer.appendChild(this._instanceTitleMessage);

        const templateContainerMessage = this.getCurrentDocument().createElement('div');
        templateContainerMessage.setAttribute("class", 'message-box');
        
        this._templateContainerMessage = templateContainerMessage;
        this._instanceContainerMessage = <HTMLElement> this._templateContainerMessage.cloneNode(true);
        this._instanceContainerMessage.style.overflowY = "scroll";
        this._instanceContainerMessage.style.height = "480px";
        this._instanceContainer.appendChild(this._instanceContainerMessage);

        this._instanceContainerMessage.style.overflowAnchor = "none";

        //this._instanceContainer.style.backgroundColor = "#DC8734";
        this._instanceContainer.style.backgroundColor = "rgba(20,20,200,0.5)";
        this._instanceContainer.style.backgroundColor = "rgba(0,19,127,0.5)";
        this._instanceContainer.style.color = "white";
        this._instanceContainer.style.height = "40%";
        this._instanceContainer.style.width = "100%";

        this._instanceContainer.style.padding = "5px";
        this._instanceContainer.style.minHeight = "540px";
        this._instanceContainer.style.height = "540px";

        this._instanceContainerMessage.appendChild(this._anchor);
        this._instanceContainerMessage.setAttribute("id", "scroller");
        const targetNode = document.getElementById("scroller");

        const config = { childList: true };
 
        const callback = function (mutationsList, observer) {
          for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
              self._instanceContainerMessage.scrollTo(0, document.body.scrollHeight);
            }
          }
        };

        const observer = new MutationObserver(callback);
        observer.observe(this._instanceContainerMessage, config);
    }

    internalLoop() {
        this.#refreshChat();        
    }

    #refreshChat() {
    	// Add new messages
    	this._state.getChat().getGraphicMessageToAdd().forEach((message: ChatMessage, uuid: string) => {
    		this._instanceMessage = <HTMLElement> this._templateMessage.cloneNode(true);
    		this._instanceMessage.setAttribute('id', uuid);
    		this._instanceMessage.innerHTML = message.getText();

    		this._instanceContainerMessage.insertBefore(this._instanceMessage, this._anchor);
            //this._instanceContainerMessage.scrollingElement.scroll(0, 1);
    	});

    	// Delete old messages
    	const messageBoxList = this._shadowRoot.querySelectorAll(".message-box");
      messageBoxList.forEach((element) => {
        if (this._state.getChat().getGraphicMessageToDelete().has(element.id)) {
          element.remove();
        }
      });
      this._state.getChat().resetGraphicMessageToAdd();
      this._state.getChat().resetGraphicMessageToDelete();
    }
}
customElements.define('chat-chat', ChatGraphicComponent);
export default ChatGraphicComponent;