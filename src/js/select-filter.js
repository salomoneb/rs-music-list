class SelectFilter extends HTMLElement {
  constructor() {
    super();
    this.albumListEl = document.querySelector(".album__list");
    this.currentAlbumLinkEl = document.querySelector(".album__current-anchor");
  }

  connectedCallback() {
    this.render();
  }

  handleSelect(e) {
    const selectedOption = e.target.value;
    this.albumListEl.dataset.filter = selectedOption;
  }

  render() {
    this.innerHTML = `
      <div class="filter" >
        <label class="filter__label" for="filter">Filter by:</label>
        <select class="filter__select" name="filter__select" id="filter">
          <option value="all" selected>All</option>
          <option value="listened">Listened</option>
          <option value="unlistened">Unlistened</option>
        </select>
      </div>
    `;

    this.afterRender();
  }

  reset() {
    this.selectEl.value = "all";
    this.albumListEl.dataset.filter = "all";
  }

  afterRender() {
    // const url = new URL(window.location.href);
    // const searchParams = new URLSearchParams(url.search);
    // const filterVal = searchParams.get("filter");

    this.selectEl = document.querySelector(".filter__select");

    // if (filterVal && (filterVal === "listened" || filterVal === "unlistened")) {
    //   const lowercaseVal = filterVal.toLowerCase();
    //   this.albumListEl.dataset.filter = lowercaseVal;
    //   this.selectEl.value = lowercaseVal;
    // }

    this.selectEl.addEventListener("change", (e) => this.handleSelect(e));

    this.currentAlbumLinkEl.addEventListener("click", () => this.reset());
  }
}

if ("customElements" in window) {
  customElements.define("select-filter", SelectFilter);
}

export default SelectFilter;
