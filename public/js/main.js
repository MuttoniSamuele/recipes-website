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
  UTILS.loadHtml("./templates/header.html", document.getElementById("header-placeholder"));
  UTILS.loadHtml("./templates/footer.html", document.getElementById("footer-placeholder"));
  setupBackButton();
}
main();
