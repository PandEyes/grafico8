//mysql se usa para poder usar mysql dentro del server
const mysql = require('mysql');
//promisify se coloca entre {} para indicar que es un módulo exportado, en este caso viene de la librería util
const { promisify } = require('util');
//database se coloca entre {} para indicar que es un módulo exportado, en este caso es nuestro archivo llamado case
const { database } = require('./keys');

//pool se usa para crear una conexión con la base de datos mandándole las propiedades
const pool = mysql.createPool(database);

//getConnection se usa para hacer la conexión con la base de datos y arrojar si es correcta o no
//El primer parámetro es de error y el segundo es la conexión
pool.getConnection((err, conexion) => {
    if(err){
        console.error('Hubo un error === ' + err);
    }
    if(conexion){
        //release se usa para indicar si se hizo la conexión
        conexion.release();
        console.log('Conexion a base de datos establecida');
    }
    return;
});

//query se usa para hacer una consulta a la base de datos
//promisify lo que le indica es que viene en una promesa, por lo tanto, sabe que es algo externo
pool.query = promisify(pool.query);

//module.exports = pool lo que le indica es que exporte a otro archivo que necesite todo lo que se haya hecho dentro de pool
module.exports = pool;