import * as API from "./spoonacular-api/api.js";
import * as UTILS from "./utils.js";

const titleElem = document.getElementById("title-txt");
const recipeImgElem = document.getElementById("recipe-img");
const prepMinsElem = document.getElementById("preparation-mins-txt");
const cookingMinsElem = document.getElementById("cooking-mins-txt");
const readyMinsElem = document.getElementById("ready-mins-txt");
const characteristicsElem = document.getElementById("characterstics-txt");
const sourceElem = document.getElementById("source-link");
const ingredientsListElem = document.getElementById("ingredients-list");
const instructionsElem = document.getElementById("instructions-txt");
const similarRecipesElem = document.getElementById("similar-recipes");

function getRecipeId() {
  const [_urlParams, queryParams] = UTILS.parseUrl(location.href);
  const recipeId = parseInt(queryParams.id);
  return isNaN(recipeId) ? null : recipeId;
}

async function renderRecipe(recipe) {
  titleElem.innerText = document.title = recipe.title;
  recipeImgElem.src = recipe.image;
  prepMinsElem.innerText = recipe.preparationMinutes;
  cookingMinsElem.innerText = recipe.cookingMinutes;
  readyMinsElem.innerText = recipe.readyInMinutes;
  let characts = [
    [recipe.dairyFree, "dairy free"],
    [recipe.glutenFree, "gluten free"],
    [recipe.vegetarian, "vegetarian"],
    [recipe.vegan, "vegan"]
  ];
  characts = characts.filter(([key, _str]) => key === true).map(([_key, str]) => str);
  characteristicsElem.innerText = characts.join(", ");
  sourceElem.innerText = recipe.sourceName;
  sourceElem.href = recipe.sourceUrl;
  recipe.extendedIngredients.forEach((ingr) => {
    const liElem = document.createElement("li");
    ingredientsListElem.appendChild(liElem);
    liElem.innerText = ingr;
  });
  instructionsElem.innerHTML = recipe.instructions;
}

async function main() {
  const recipeId = getRecipeId();
  if (recipeId === null) {
    location.href = "/";
    return;
  }
  const recipe = await API.getRecipeInformation(recipeId);
  renderRecipe(recipe);
}
main();
