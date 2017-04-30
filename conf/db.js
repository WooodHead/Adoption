var mysql = require('mysql');
var db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password : '789632145',
  port: "3306",
  database : "adoption"
});

console.log("Database connect succed!");
module.exports = db;