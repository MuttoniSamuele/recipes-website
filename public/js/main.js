import * as UTILS from "./utils.js";

function setupBackButton() {
  const backBtnElem = document.getElementById("back-btn");
  if (!backBtnElem) {
    return;
  }
  backBtnElem.addEventListener("click", () => {
    // TODO: make your own history stack
    if (history.length > 1) {
      history.back();
    } else {
      location.href = "/";
    }
  });
}

function main() {
  // TODO: export header and footer loading function in different module (add a callback)
  // TODO: write something when recipes are found
  UTILS.loadHtml("./templates/header.html", document.getElementById("header-placeholder"));
  UTILS.loadHtml("./templates/footer.html", document.getElementById("footer-placeholder"));
  setupBackButton();
}
main();
