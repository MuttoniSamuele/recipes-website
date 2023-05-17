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
  const recipes = await fetchRecipes();
  renderRecipePreviews(recipes);
}
main();
