document.addEventListener("customLoaded", (e) => {
  document.querySelector(e.detail.selector).hidden = true;
});
