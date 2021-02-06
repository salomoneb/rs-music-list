const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function (value, outputPath) {
  if (outputPath.endsWith(".html")) {
    const DOM = new JSDOM(value, {
      resources: "usable",
    });

    const document = DOM.window.document;
    const images = [...document.querySelectorAll("img")];

    if (images.length) {
      images.forEach((image) => {
        image.setAttribute("loading", "lazy");
      });
    }
    return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
  }
  return value;
};
