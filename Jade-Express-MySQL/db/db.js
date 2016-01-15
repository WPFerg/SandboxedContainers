var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sec_train_web',
    password : 'web_pass',
//    multipleStatements: true, // Deliberately opening SQLi vulnerability
    database : 'sec_training'
});

connection.connect();

module.exports = connection;
