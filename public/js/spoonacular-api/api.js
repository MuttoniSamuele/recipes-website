import RecipePreview from "./RecipePreview.js";
import Recipe from "./Recipe.js";

const API_PATH = "/api/recipes/";

export async function rawRequest(path, params = {}) {
  const queryString = Object.entries(params).map(([key, value]) => `${key}=${value}`).join("&");
  const res = await fetch(`${API_PATH}${path}?${queryString}`);
  if (!res.ok) {
    throw new Error("Request error");
  }
  const json = await res.json();
  if (json.status === "failure") {
    throw new Error("Request error");
  }
  return json;
}

export async function searchRecipes(query, offset = 0, number = 10, params = {}) {
  const json = await rawRequest("complexSearch", {
    query: String(query),
    offset: parseInt(offset),
    number: parseInt(number),
    ...params
  });
  return json.results.map((v) => new RecipePreview(v));
}

export async function getRecipeInformation(id) {
  const json = await rawRequest(`${id}/information`);
  return new Recipe(json);
}

export async function getSimilarRecipes(id, number = 10) {
  const json = await rawRequest(`${id}/similar`, { number: number });
  return json.map((v) => new RecipePreview(v));
}

export async function getRandomRecipes(number = 10) {
  const json = await rawRequest("random", { number: number });
  return json.recipes.map((v) => new Recipe(v));
}
