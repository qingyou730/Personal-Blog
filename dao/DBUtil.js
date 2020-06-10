var mysql = require("mysql2");

function createConnection() {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "123123",
        database: 'my_blog'
    })
    return connection;
}
module.exports.createConnection = createConnection;

