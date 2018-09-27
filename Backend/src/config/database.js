const mysql = require('mysql2');

exports.Connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "entopedia"
});

