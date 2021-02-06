const sheets = require("../providers/auth");

const spreadsheetData = new Promise((resolve, reject) => {
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: "A1:G501",
    },
    (err, res) => {
      if (err) reject(err);

      const data = res.data.values;
      const headers = data[0].map((header) => header.toLowerCase());
      const values = data.slice(1);
      const json = dataToJson(headers, values);
      resolve(json);
    }
  );
});

/**
 * Convert returned data to JSON
 * @param {Array} headers
 * @param {Array} values
 * @returns Array
 */
function dataToJson(headers, values) {
  const [rank, title, artist, year, listened, rating, thoughts] = headers;
  return values.map((row) => {
    const modifiedRow = cleanRow(row, headers);

    return {
      [rank]: modifiedRow[0],
      [title]: modifiedRow[1],
      [artist]: modifiedRow[2],
      [year]: modifiedRow[3],
      [listened]: modifiedRow[4],
      [rating]: modifiedRow[5],
      [thoughts]: modifiedRow[6],
    };
  });
}

/**
 * Set null values if cells are empty/undefined
 * @param {Array} row
 * @param {Array} headers
 * @returns Array
 */
function cleanRow(row, headers) {
  return headers.map((header, headerIndex) => {
    if (!row[headerIndex]) {
      row[headerIndex] = null;
    }
    return row[headerIndex];
  });
}

module.exports = async function () {
  return await spreadsheetData;
};
