import * as UTILS from "./utils.js";

let recipePreviewNode = null;

export async function renderRecipePreview(recipe) {
  if (!recipePreviewNode) {
    recipePreviewNode = await UTILS.loadHtml("./templates/recipePreview.html");
  }
  const recipeElem = recipePreviewNode.cloneNode(true);
  recipeElem.querySelector("[data-preview-img]").src = recipe.image;
  recipeElem.querySelector("[data-preview-title]").innerText = recipe.title;
  recipeElem.querySelector("[data-preview-url]").href = `/recipe.html?id=${recipe.id}`;
  return recipeElem;
}
