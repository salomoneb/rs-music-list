module.exports = {
  getDate() {
    const date = new Date();
    const options = {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "America/New_York",
    };
    return date.toLocaleString("en-US", options);
  },
};
