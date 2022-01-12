const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, conexion) => {
    if(err){
        console.error('Hubo un error === ' + err);
    }
    if(conexion){
        conexion.release();
        console.log('Conexion a base de datos establecida');
    }
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;