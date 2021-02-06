module.exports = function (config) {
  // Sass
  config.addWatchTarget("./src/scss");

  // Passthrough
  config.addPassthroughCopy("./src/fonts");
  config.addPassthroughCopy({ "./src/static/favicon.png": "favicon.png" });

  // Aliases
  config.addLayoutAlias("base", "layouts/base.njk");

  if (process.env.ELEVENTY_ENV === "production") {
    config.addTransform("htmlmin", htmlMinTransform);
  }

  return {
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "dist",
    },
    passthroughFileCopy: true,
  };
};
