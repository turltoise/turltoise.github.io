import AbstractGraphicComponent from "./AbstractGraphicComponent.js";
class MainPageGraphicComponent extends AbstractGraphicComponent {
    constructor(container) {
        super(container);
        const containerImg = document.createElement('div');
        containerImg.style.width = "100%";
        containerImg.style.height = "100%";
        containerImg.style.minWidth = "100%";
        containerImg.style.minHeight = "100%";
        containerImg.style.position = "fixed";
        containerImg.style.left = "0px";
        containerImg.style.top = "0px";
        containerImg.style.zIndex = "-10";
        containerImg.style.display = "flex";
        containerImg.style.justifyContent = "center";
        containerImg.style.alignItems = "center";
        containerImg.style.overflow = "hidden";
        const imgBg = document.createElement('img');
        imgBg.style.position = "relative";
        imgBg.src = "./img/bg.jpg";
        imgBg.style.minWidth = "100%";
        imgBg.style.minHeight = "100%";
        imgBg.style.flexShrink = "0";
        const templateContainerBody = document.createElement('div');
        const instanceContainerBody = templateContainerBody.cloneNode(true);
        instanceContainerBody.style.boxSizing = "border-box";
        containerImg.appendChild(imgBg);
    }
}
customElements.define('main-page', MainPageGraphicComponent);
export default MainPageGraphicComponent;
//# sourceMappingURL=MainPageGraphicComponent.js.map