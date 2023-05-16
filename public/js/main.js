import * as UTILS from "./utils.js";

function main() {
  UTILS.loadHtml("./templates/header.html", document.getElementById("header-placeholder"));
  UTILS.loadHtml("./templates/footer.html", document.getElementById("footer-placeholder"));
}
main();
