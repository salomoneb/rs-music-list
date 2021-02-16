const sheets = require("../providers/auth");

const spreadsheetData = new Promise((resolve, reject) => {
  sheets.spreadsheets.values.batchGet(
    {
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      ranges: ["A1:G501", "K3:K3"],
    },
    (err, res) => {
      if (err) reject(err);
      const [albumData, currentAlbumData] = res.data.valueRanges;
      const currentAlbumString = handleCurrentAlbum(currentAlbumData.values);
      const albumJson = handleAlbumData(albumData.values);
      resolve([albumJson, currentAlbumString]);
    }
  );
});

/**
 * Cleaning handler for current album name
 * @param {Array} currentAlbumData
 * @returns {String}
 */
function handleCurrentAlbum(currentAlbumData) {
  return currentAlbumData[0][0].split(" - ")[1];
}

/**
 * Cleaning handler for album data
 * @param {Array} albumData
 * @returns {JSON}
 */
function handleAlbumData(albumData) {
  const headers = albumData[0].map((header) => header.toLowerCase());
  const values = albumData.slice(1);

  return dataToJson(headers, values);
}

/**
 * Convert returned data to JSON
 * @param {Array} headers
 * @param {Array} values
 * @returns {Array}
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
      [listened]: convertToBoolean(modifiedRow[4]),
      [rating]: modifiedRow[5],
      [thoughts]: preserveLineBreaks(modifiedRow[6]),
    };
  });
}

/**
 * Set null values if cells are empty/undefined
 * @param {Array} row
 * @param {Array} headers
 * @returns {Array}
 */
function cleanRow(row, headers) {
  return headers.map((header, headerIndex) => {
    if (!row[headerIndex]) {
      row[headerIndex] = null;
    }
    return row[headerIndex];
  });
}

function preserveLineBreaks(text) {
  if (!text) return text;

  return text.replace(/\n/g, "<br/>");
}

function convertToBoolean(str) {
  return str === "TRUE" ? true : false;
}

module.exports = async function () {
  try {
    return await spreadsheetData;
  } catch (err) {
    return err;
  }
};
