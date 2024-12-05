const mysql = require("mysql2/promise");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "soytk",
  port: 3306,
  database: "my_contacts",
});

module.exports = db;
