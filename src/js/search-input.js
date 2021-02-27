class SearchInput extends HTMLElement {
  constructor() {
    super();

    this.allNodes = new Map();
    this.searchTermNode;

    document.querySelectorAll(".album").forEach((album) => {
      const rank = album.dataset.rank;
      const title = album.dataset.title;
      const artist = album.dataset.artist;
      const year = album.dataset.year;
      const formattedAlbumInfo = `${rank}. ${title} - ${artist} (${year})`;

      this.allNodes.set(formattedAlbumInfo, album);
    });
  }

  connectedCallback() {
    this.render();
  }

  handleInput(e) {
    const val = e.target.value.toLowerCase();
    let filteredHtml = "";

    for (let [key, album] of this.allNodes) {
      if (key.toLowerCase().includes(val)) {
        filteredHtml += album.outerHTML;
      }
    }

    this.albumsList.innerHTML = filteredHtml;

    if (!filteredHtml.length) {
      this.albumsList.innerHTML = `<li>No results for <span class="search-term"></span></li>`;

      document.querySelector(".search-term").textContent = e.target.value;
    }
  }

  render() {
    this.innerHTML = `
      <div class="search">
        <label class="search__label sr-only" for="search">Search:</label>
        <input type="text" name="search__input" class="search__input" id="search" placeholder="Search">
      </div>
    `;

    const customLoadedEvent = new CustomEvent("customLoaded", {
      detail: {
        selector: "#search-placeholder",
      },
    });
    document.dispatchEvent(customLoadedEvent);

    this.afterRender();
  }

  afterRender() {
    this.selectEl = document.querySelector("#search");
    this.albumsList = document.querySelector(".album__list");
    this.selectEl.addEventListener("input", (e) => {
      this.handleInput(e);
    });
  }
}

if ("customElements" in window) {
  customElements.define("search-input", SearchInput);
}

export default SearchInput;
