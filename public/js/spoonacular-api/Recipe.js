export default class Recipe {
  #id;
  #title;
  #summary;
  #instructions;
  #image;
  #diets;
  #cuisines;
  #dishTypes;
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
    this.#summary = String(json.summary);
    this.#instructions = String(json.instructions);
    this.#image = String(json.image);
    this.#diets = json.diets.map((v) => String(v));
    this.#cuisines = json.cuisines.map((v) => String(v));
    this.#dishTypes = json.dishTypes.map((v) => String(v));
    this.#extendedIngredients = json.extendedIngredients.map((v) => String(v.original));
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

  get summary() {
    return this.#summary;
  }

  get instructions() {
    return this.#instructions;
  }

  get image() {
    return this.#image;
  }

  get diets() {
    return [...this.#diets];
  }

  get cuisines() {
    return [...this.#cuisines];
  }

  get dishTypes() {
    return [...this.#dishTypes];
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
