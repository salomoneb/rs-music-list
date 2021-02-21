import SelectFilter from "./select-filter.js";
import SearchInput from "./search-input.js";

document
  .querySelector(".album__current-anchor")
  .addEventListener("click", () => {
    document.querySelector(".album__list").dataset.filter = "all";
  });

export { SelectFilter, SearchInput };
