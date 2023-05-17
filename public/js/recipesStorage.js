const KEY_NAME = "saved";

function setRecipes(recipes) {
  if (!(recipes instanceof Array)) {
    return;
  }
  recipes = [...new Set(recipes)];
  localStorage.setItem(KEY_NAME, recipes);
}

export function clearRecipes() {
  setRecipes([]);
}

export function getRecipes() {
  const data = localStorage.getItem(KEY_NAME);
  if (!data) {
    return [];
  }
  let json;
  try {
    json = JSON.parse(data);
  } catch (e) {
    clearRecipes();
    return [];
  }
  if (!(json instanceof Array)) {
    clearRecipes();
    return [];
  }
  return json;
}

export function saveRecipe(id) {
  const recipes = getRecipes();
  recipes.push(id);
  setRecipes(recipes);
}
