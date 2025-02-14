const mysql = require('mysql2');
// 创建连接池
const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: 'root123456',
database: 'mydata'
});
console.log('mysql initialize completed');
module.exports = pool;
