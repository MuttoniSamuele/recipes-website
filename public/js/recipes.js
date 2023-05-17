import * as API from "./spoonacular-api/api.js";
import * as UTILS from "./utils.js";

const recipesElem = document.getElementById("recipes");
let recipeTemplateNode = null;

function getSearch() {
  const [_urlParams, queryParams] = UTILS.parseUrl(location.href);
  return queryParams.q || "";
}

async function renderRecipePreview(recipe) {
  if (!recipeTemplateNode) {
    recipeTemplateNode = await UTILS.loadHtml("./templates/recipePreview.html");
  }
  const recipeElem = recipeTemplateNode.cloneNode(true);
  recipeElem.querySelector("[data-preview-img]").src = recipe.image;
  recipeElem.querySelector("[data-preview-title]").innerText = recipe.title;
  recipeElem.querySelector("[data-preview-url]").href = `/recipe.html?id=${recipe.id}`;
  return recipeElem;
}

async function renderRecipePreviews(recipes) {
  for (const recipe of recipes) {
    recipesElem.appendChild(await renderRecipePreview(recipe));
  }
}

async function main() {
  const search = getSearch();
  console.log(search)
  const recipes = await API.searchRecipes(search, 0, 10);
  await renderRecipePreviews(recipes);
}
main();
