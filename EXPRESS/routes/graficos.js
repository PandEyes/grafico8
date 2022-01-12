//express se usa para el servidor
const express = require('express');
//router se usa para poder navegar entre rutas
const router = express.Router();
//importamos nuestro pool del archivo database que teníamos creado
const pool = require('../database');

//En este caso router.get va a tomar la ruta grafico y el parámetro del indice que le mandaron a través de la URL
//En este caso los (:) le dicen al router que el indice va a ser cambiante y que cuando venga precedido por gráficos, deba hacer algo
//Al ser una conexión a la base de datos debe llevar un async, ya que es una conexión externa
router.get('/grafico/:indice', async (req, res) => {
    //Esta constante indice entre {} es para obtener la propiedad que viene a través de los parámetros.
    //En este caso se usa req.params para obtener el parámetro que está asignado al indice que viene en la URL
    const { indice } = req.params;
    //datos es el que hará la consulta a la base de datos, por lo tanto lleva el await. 
    //Para hacer una consulta a la base de datos se debe colocar SELECT * FROM Nombre de la tabla de la base de datos
    //En este caso el nombre de la tabla está incluida en el .env, por lo tanto se llama de esta manera y se usa un WHERE
    //para establecer un filtro de que solo traiga los datos donde se cumpla esa condición, que es que ticker sea igual
    //a el signo de ?. El signo ? indica es que el dato se lo va a dar una variable que va a ser establecida separada por una coma.
    //En este caso es lo que viene en la variable indice
    const datos = await pool.query(`SELECT * FROM ${process.env.NOMBRE_TABLA} WHERE ticker = ?`, [indice]);
    //datosExtraidos lo que hará es almacenar lo que va a transformar lo que viene de la base de datos y transformarlos en un json
    const datosExtraidos = JSON.stringify(datos);
    //datosNuevos lo que hará es almacenar la transformación de los datos json en objetos de JS
    var datosNuevos = JSON.parse(datosExtraidos);
    //map lo que hace es recorrer lo que viene en datosNuevos y le asigna lo que se necesita en cada recorrido
    datosNuevos.map((i) => {
        i.colorLinea = process.env.COLOR_LINEA;
        //charAt se usa para obtener la letra en la posición que se coloque entre paréntesis, en este caso la primera
        //y se le indica con toUpperCase que la ponga en mayúscula. Luego, con el + y el slice se le dice que corte 
        //lo que está en la posición entre paréntesis, en este caso la segunda
    });
    //Se transforma en JSON el objeto datosNuevos con los cambios realizados 
    JSON.stringify(datosNuevos);
    //res.send envía al JSON a la aplicación
    res.send(datosNuevos);
});

//Se exporta el router para que pueda ser usado en toda la aplicación
module.exports = router;