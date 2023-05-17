import * as API from "./spoonacular-api/api.js";
import * as UTILS from "./utils.js";

const loadingElem = document.getElementById("loading-div");
const recipeElem = document.getElementById("recipe-div");
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

function conditionallyRender(element, text, isHtml = false) {
  if (text === null || text === undefined || text == "null" || text == -1) {
    UTILS.setVisibility(element.parentElement, false);
    return;
  }
  if (isHtml) {
    element.innerHTML = text;
  } else {
    element.innerText = text;
  }
}

async function renderRecipe(recipe) {
  UTILS.setVisibility(loadingElem, false);
  UTILS.setVisibility(recipeElem, true);
  titleElem.innerText = document.title = recipe.title;
  recipeImgElem.src = recipe.image;
  conditionallyRender(prepMinsElem, recipe.preparationMinutes);
  conditionallyRender(cookingMinsElem, recipe.cookingMinutes);
  conditionallyRender(readyMinsElem, recipe.readyInMinutes);
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
  conditionallyRender(instructionsElem, recipe.instructions, true);
}

async function main() {
  const recipeId = getRecipeId();
  if (recipeId === null) {
    return;
  }
  let recipe;
  try {
    recipe = await API.getRecipeInformation(recipeId);
  } catch (e) {
    return;
  }
  renderRecipe(recipe);
}
main();
