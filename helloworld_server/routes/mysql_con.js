const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    port: "3306",
    database: "nodejs"
});

module.exports = con;