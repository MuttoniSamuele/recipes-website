import loadHeader from "./htmlLoader.js";

function main() {
  loadHeader("./header.html", document.getElementById("header-placeholder"));
  loadHeader("./footer.html", document.getElementById("footer-placeholder"));
}
main();
