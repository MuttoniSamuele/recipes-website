import * as UTILS from "./utils.js";

export async function loadHeaderAndFooter() {
  await UTILS.loadHtml("./templates/header.html", document.getElementById("header-placeholder"));
  await UTILS.loadHtml("./templates/footer.html", document.getElementById("footer-placeholder"));
}

export function setupBackButton() {
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
