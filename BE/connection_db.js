var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'gongzhe',
  port     : '3306',
  database : 'rlink'
});







module.exports = conn;