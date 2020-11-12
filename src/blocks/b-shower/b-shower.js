import "./b-shower.css";
import "../b-youtube-wrapper/b-youtube-wrapper";

export class BShower {
  constructor(selector) {
    this.el = document.querySelector(selector);
    this.contentEl = null;
  }

  changeSlide(mediaType, url) {
    if (this.contentEl) {
      this.contentEl.remove();
    }

    if (mediaType === "image") {
      const element = document.createElement("img");

      element.src = url;
      element.classList.add("b-shower__slide", "b-shower__slide_type_img");

      this.contentEl = element;

      this.el.appendChild(element);
    } else if (mediaType === "video") {
      const elementWrapper = document.createElement("div");
      const element = document.createElement("iframe");

      elementWrapper.classList.add(
        "b-shower__slide",
        "b-shower__slide_type_video",
        "b-youtube-wrapper"
      );

      this.contentEl = elementWrapper;

      element.src = url;
      element.setAttribute("frameborder", "0");

      this.el.appendChild(elementWrapper);
      elementWrapper.appendChild(element);
    }
  }
}
