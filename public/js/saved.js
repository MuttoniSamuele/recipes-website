import { loadHeaderAndFooter, setupBackButton } from "./components.js";
import * as API from "./spoonacular-api/api.js";
import { getRecipes } from "./recipesStorage.js";
import { renderRecipePreview } from "./recipeNodes.js";

const recipesElem = document.getElementById("recipes");

async function fetchAndRenderRecipePreview(id) {
  const recipe = await API.getRecipeInformation(id);
  recipesElem.appendChild(await renderRecipePreview(recipe));
}

function renderRecipePreviews() {
  getRecipes().map((id) => {
    fetchAndRenderRecipePreview(id);
  });
}

async function main() {
  // TODO: write something when no recipes are found
  loadHeaderAndFooter();
  setupBackButton();
  renderRecipePreviews();
}
main();
