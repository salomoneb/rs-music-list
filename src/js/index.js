// Remove the placeholder elements as each one loads
document.addEventListener("customLoaded", (e) => {
  document.querySelector(e.detail.selector).remove();
});
