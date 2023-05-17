import * as API from "./spoonacular-api/api.js";
import * as UTILS from "./utils.js";

const RECIPES_PER_REQUEST = 10;

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

async function fetchAndRenderRecipes(search, offset = 0) {
  const recipes = await API.searchRecipes(search, RECIPES_PER_REQUEST, offset);
  await renderRecipePreviews(recipes);
}

function setupFetchOnScroll(search) {
  let isFetching = false;
  let offset = RECIPES_PER_REQUEST;
  window.addEventListener("scroll", async () => {
    if (isFetching) {
      return;
    }
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    if (scrollPercentage >= 80) {
      isFetching = true;
      await fetchAndRenderRecipes(search, offset);
      offset += RECIPES_PER_REQUEST;
      setTimeout(() => isFetching = false, 500);
    }
  });
}

function main() {
  const search = getSearch();
  setupFetchOnScroll(search);
  fetchAndRenderRecipes(search);
  // TODO: set the current search as the search bar value
  // const e = document.getElementById("search-input");
  // if (e) {
  //   e.value = search;
  // }
}
main();
