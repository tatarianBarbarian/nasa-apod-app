export class BAbstractEl {
  constructor(selector) {
    this.el = document.querySelector(selector);
  }

  addListener(type, cb) {
    this.el.addEventListener(type, cb);
  }

  onClick(cb) {
    this.addListener("click", cb);
  }

  disable() {
    this.el.setAttribute("disabled", "disabled");
  }

  enable() {
    this.el.removeAttribute("disabled");
  }

  addClass(cssClass) {
    this.el.classList.add(cssClass);
  }

  removeClass(cssClass) {
    this.el.classList.remove(cssClass);
  }
}
