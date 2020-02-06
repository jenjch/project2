// require mysql
const mysql = require("mysql");

// require pw in separate file using module.exports
const pw = require("./pw.js");

var connection;

// JAWSDB, set up connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: pw,
    // change if this is not the right name
    database: "podcast_db"
  });
}

// make connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// connection.connect();
// export connection for our ORM to use.
module.exports = connection;
