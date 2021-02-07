class SelectFilter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  handleSelect(e) {
    const selectedOption = e.target.value;
    document.querySelector(".album__list").dataset.filter = selectedOption;
  }

  render() {
    this.innerHTML = `
      <div class="filter">
        <label class="filter__label" for="filter">Filter by:</label>
        <select class="filter__select" name="filter__select" id="filter">
          <option value="all">All</option>
          <option value="listened">Listened</option>
          <option value="unlistened">Unlistened</option>
        </select>
      </div>
    `;

    this.afterRender();
  }

  afterRender() {
    this.selectEl = document.querySelector(".filter__select");
    this.selectEl.addEventListener("change", this.handleSelect);
  }
}

if ("customElements" in window) {
  customElements.define("select-filter", SelectFilter);
}

export default SelectFilter;
