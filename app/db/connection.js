
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/ads_posts.db');

db.run(`CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY NOT NULL, postId INTEGER, name TEXT, email TEXT, body TEXT ) `);

module.exports = db;