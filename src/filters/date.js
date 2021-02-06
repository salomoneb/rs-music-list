module.exports = function (date) {
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  };

  return date.toLocaleString("en-US", options);
};
