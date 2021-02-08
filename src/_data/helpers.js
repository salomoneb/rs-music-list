module.exports = {
  getDate() {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleString("en-US", options);
  },
};
