export default class Recipe {
  #id;
  #title;
  #instructions;
  #image;
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
    this.#id = parseInt(json.id);
    this.#title = String(json.title);
    this.#instructions = String(json.instructions);
    this.#image = String(json.image);
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

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get instructions() {
    return this.#instructions;
  }

  get image() {
    return this.#image;
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
