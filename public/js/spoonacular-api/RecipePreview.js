export default class RecipePreview {
  #id;
  #title;
  #image;

  constructor(json) {
    this.#id = parseInt(json.id);
    this.#title = String(json.title);
    this.#image = String(json.image);
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get image() {
    return this.#image;
  }
}
