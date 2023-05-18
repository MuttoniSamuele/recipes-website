import * as API from "./spoonacular-api/api.js";
import { renderRecipePreview } from "./recipeNodes.js";

const DISCOVER_RECIPES_CNT = 10;

const recipesElem = document.getElementById("discover-recipes");

async function renderRecipePreviews(recipes) {
  for (const recipe of recipes) {
    recipesElem.appendChild(await renderRecipePreview(recipe));
  }
}

async function main() {
  const recipes = await API.getRandomRecipes(DISCOVER_RECIPES_CNT);
  await renderRecipePreviews(recipes);
}
main();
