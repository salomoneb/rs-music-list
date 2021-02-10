class SearchInput extends HTMLElement {
  constructor() {
    super();

    this.nodes = new Map();

    document.querySelectorAll(".album").forEach((album) => {
      this.nodes.set(album.id, album);
    });
  }

  connectedCallback() {
    this.render();
  }

  handleInput(e) {
    // Do something
  }

  render() {
    this.innerHTML = `
      <div class="search">
        <label class="search__label" for="search">Search:</label>
        <input type="text" name="search__input" class="search__input" id="search">
      </div>
    `;

    this.afterRender();
  }

  afterRender() {
    this.selectEl = document.querySelector(".search__input");
    this.selectEl.addEventListener("input", this.handleInput);
  }
}

if ("customElements" in window) {
  customElements.define("search-input", SearchInput);
}

export default SearchInput;
