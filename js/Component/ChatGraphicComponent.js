var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ChatGraphicComponent_instances, _ChatGraphicComponent_refreshChat;
import Chat from "../Game/Chat/Chat.js";
import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
class ChatGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        _ChatGraphicComponent_instances.add(this);
        const self = this;
        setInterval(() => self.internalLoop(), 20);
        let style = `
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

        .message-earn-gold {
          color: rgb(253, 201, 17);
          font-weight: 900;
        }
        `;
        let templateStyle = this.getCurrentDocument().createElement('style');
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
        const templateTitleMessage = this.getCurrentDocument().createElement('div');
        this._templateTitleMessage = templateTitleMessage;
        this._instanceTitleMessage = this._templateTitleMessage.cloneNode(true);
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
        this._instanceContainerMessage = this._templateContainerMessage.cloneNode(true);
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
        __classPrivateFieldGet(this, _ChatGraphicComponent_instances, "m", _ChatGraphicComponent_refreshChat).call(this);
    }
}
_ChatGraphicComponent_instances = new WeakSet(), _ChatGraphicComponent_refreshChat = function _ChatGraphicComponent_refreshChat() {
    let chat = this._container.get(Chat.name);
    // Add new messages
    chat.getGraphicMessageToAdd().forEach((message, uuid) => {
        this._instanceMessage = this._templateMessage.cloneNode(true);
        this._instanceMessage.setAttribute('id', uuid);
        this._instanceMessage.style.backgroundColor = message.getColor();
        this._instanceMessage.innerHTML = message.getText();
        this._instanceContainerMessage.insertBefore(this._instanceMessage, this._anchor);
        //this._instanceContainerMessage.scrollingElement.scroll(0, 1);
    });
    // Delete old messages
    const messageBoxList = this._shadowRoot.querySelectorAll(".message-box");
    messageBoxList.forEach((element) => {
        if (chat.getGraphicMessageToDelete().has(element.id)) {
            element.remove();
        }
    });
    chat.resetGraphicMessageToAdd();
    chat.resetGraphicMessageToDelete();
};
customElements.define('chat-chat', ChatGraphicComponent);
export default ChatGraphicComponent;
//# sourceMappingURL=ChatGraphicComponent.js.map