var mysql = require('mysql');
var db = mysql.createPool({
  host : 'server.ngrok.cc',
  user : 'root',
  password : 'ursafenow@#233',
  port: "5512",
  database : "adoption"
});

// db.connect();
console.log("Database connect succed!");
module.exports = db;