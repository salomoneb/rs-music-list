module.exports = {
  getDate() {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      day: "numeric",
      month: "long",
    };
    return date.toLocaleString("en-US", options);
  },
};
