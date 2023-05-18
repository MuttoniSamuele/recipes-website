import RecipePreview from "./RecipePreview.js";

export default class Recipe extends RecipePreview {
  #instructions;
  #extendedIngredients;
  #cookingMinutes;
  #preparationMinutes;
  #readyInMinutes;
  #dairyFree;
  #glutenFree;
  #vegetarian;
  #vegan;
  #sourceName;
  #sourceUrl;

  constructor(json) {
    super(json);
    this.#instructions = json.instructions ? String(json.instructions) : null;
    this.#extendedIngredients = json.extendedIngredients?.map((v) => String(v.original)) || [];
    this.#cookingMinutes = parseInt(json.cookingMinutes);
    this.#preparationMinutes = parseInt(json.preparationMinutes);
    this.#readyInMinutes = parseInt(json.readyInMinutes);
    this.#dairyFree = Boolean(json.dairyFree);
    this.#glutenFree = Boolean(json.glutenFree);
    this.#vegetarian = Boolean(json.vegetarian);
    this.#vegan = Boolean(json.vegan);
    this.#sourceName = String(json.sourceName);
    this.#sourceUrl = String(json.sourceUrl);
  }

  get instructions() {
    return this.#instructions;
  }

  get extendedIngredients() {
    return [...this.#extendedIngredients];
  }

  get cookingMinutes() {
    return this.#cookingMinutes;
  }

  get preparationMinutes() {
    return this.#preparationMinutes;
  }

  get readyInMinutes() {
    return this.#readyInMinutes;
  }

  get dairyFree() {
    return this.#dairyFree;
  }

  get glutenFree() {
    return this.#glutenFree;
  }

  get vegetarian() {
    return this.#vegetarian;
  }

  get vegan() {
    return this.#vegan;
  }

  get sourceName() {
    return this.#sourceName;
  }

  get sourceUrl() {
    return this.#sourceUrl;
  }
}
