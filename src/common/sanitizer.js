import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export class DOMSanitizer {
  constructor() {
    if (this.constructor["DOMSanitizer"]) {
      return this.constructor["DOMSanitizer"];
    }

    const window = new JSDOM("").window;
    this.DOMPurify = createDOMPurify(window);
    this.constructor["DOMSanitizer"] = this;
  }

  clean(data) {
    return this.DOMPurify.sanitize(data);
  }
}
