const fs = require("fs");
const path = require("path");

const FILES = Object.freeze({
  movies: path.join(__dirname, "movies.json"),
  users: path.join(__dirname, "users.json"),
});

function fileFor(name) {
  const file = FILES[name];
  if (!file) throw new Error(`Unknown database collection: ${name}`);
  return file;
}

function readDB(name) {
  const file = fileFor(name);
  try {
    const value = JSON.parse(fs.readFileSync(file, "utf8"));
    if (value === null || typeof value !== "object") {
      throw new Error("database root must be an object or array");
    }
    return value;
  } catch (error) {
    error.message = `Unable to read ${name} database: ${error.message}`;
    throw error;
  }
}

function writeDB(name, data) {
  const file = fileFor(name);
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(temp, JSON.stringify(data, null, 2) + "\n", "utf8");
    fs.renameSync(temp, file);
  } catch (error) {
    try { if (fs.existsSync(temp)) fs.unlinkSync(temp); } catch (_) { /* keep original error */ }
    error.message = `Unable to write ${name} database: ${error.message}`;
    throw error;
  }
}

function databaseStatus() {
  return Object.fromEntries(Object.entries(FILES).map(([name, file]) => ({
    [name]: { exists: fs.existsSync(file), file: path.basename(file) },
  })).map(entry => Object.entries(entry)[0]));
}

module.exports = { readDB, writeDB, databaseStatus };
