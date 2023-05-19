import { loadHeaderAndFooter, setupBackButton } from "./components.js";
import * as API from "./spoonacular-api/api.js";
import { getRecipes } from "./recipesStorage.js";
import { renderRecipePreview } from "./recipeNodes.js";

const recipesElem = document.getElementById("recipes");

async function fetchRecipes() {
  const promises = getRecipes().map((id) => API.getRecipeInformation(id));
  return await Promise.all(promises);
}

async function renderRecipePreviews(recipes) {
  for (const recipe of recipes) {
    recipesElem.appendChild(await renderRecipePreview(recipe));
  }
}

async function main() {
  // TODO: write something when no recipes are found
  loadHeaderAndFooter();
  setupBackButton();
  const recipes = await fetchRecipes();
  await renderRecipePreviews(recipes);
}
main();
