const mysql = require('mysql2/promise');
const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Raut@2025',
    database:'testdb'
});

module.exports=mysqlPool;