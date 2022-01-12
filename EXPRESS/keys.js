//module.exports permite exportar lo que se encuentra dentro de sus llaves para poder usarlo en otro archivo
//En este caso se está estableciendo un objeto llamado database con las propiedades para conectarse a una base de datos
module.exports = {
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
}