const path = require("path");
const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");
const { users, problems, submissions } = require("./schema.js");

const sqlite = new Database(path.join(__dirname, "../sqlite.db"));
const db = drizzle(sqlite);

module.exports = { db, users, problems, submissions };
