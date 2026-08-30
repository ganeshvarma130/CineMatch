// ─────────────────────────────────────────────
//  db.js  —  tiny JSON-file "database" helper
//  Every route imports readDB / writeDB instead
//  of touching fs directly.
// ─────────────────────────────────────────────
const fs   = require("fs");
const path = require("path");

const FILES = {
  movies : path.join(__dirname, "movies.json"),
  users  : path.join(__dirname, "users.json"),
};

/** Read a JSON file and return parsed data. */
function readDB(name) {
  const raw = fs.readFileSync(FILES[name], "utf8");
  return JSON.parse(raw);
}

/** Write data back to a JSON file (pretty-printed). */
function writeDB(name, data) {
  fs.writeFileSync(FILES[name], JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readDB, writeDB };
