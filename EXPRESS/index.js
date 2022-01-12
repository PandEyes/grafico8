//dotenv para variables de entorno
require('dotenv').config();
//express para crear el server express
const express = require('express');
//morgan para ver los códigos de las solicitudes
const morgan = require('morgan');
//cors se usa para activar las autorizaciones de consultas del servidor
const cors = require('cors');
//path se usar para establecer las rutas 
const path = require('path');
//PUERTO se usa para establecer el nro del puerto
const PUERTO = 4300;
//app se usa para inicializar express
const app = express();

//set se puede usar para asignar una variable entre comillas y asignarle el valor que se necesite
app.set('port', process.env.PORT || PUERTO);
//get en este caso busca la ruta principal y luego ejecuta la función llamada inicio
app.get('/', inicio);
//get en este caso busca una ruta que se llama gráfico y un ticker que viene como parámetro en la URL.
//Los dos puntos (:) se usan para indicar que viene es por un parámetro y no es una ruta como tal absoluta
//sendFile se usa para enviar el archivo que se necesita con el __dirname, el cual va a la dirección del alojamiento y busca la ruta
app.get('/grafico/:ticker', (req, res) => {
    res.sendFile(__dirname + "/public/grafico.html");
});
//use en este caso se usa con un express.static para establecerle a express dónde estarán las rutas de los archivos estáticos
//para que pueda procesarlos
app.use(express.static(path.join(__dirname, 'public')));
//use en este caso usa la ruta static y le asigna la ruta pública creada
app.use("/static", express.static("public"));

//Esta función llamada inicio se usa para mandar la página de inicio al get principal, ya que fue llamada dentro de ese get
function inicio (peticion, resultado) {
    resultado.sendFile(__dirname + "/public/index.html");
}

//Aquí se inicializa morgan y se usa dev para indicarle que es en fase de desarrollo
app.use(morgan('dev'));
//use en este caso permite usar cors para conectarse a las solicitudes externas
app.use(cors());
//use en este caso elimina el uso extendido de las URL codificadas para que no haya problemas al acceder a rutas estáticas
app.use(express.urlencoded({extended: false}));
//use en este caso le dice a express que maneje las respuestas dentro del server como un .json
app.use(express.json());
//use en este caso le dice a express que use la carpeta routes dentro de la aplicación
app.use(require('./routes'));
//use en este caso se le indica que cuando acceda a la ruta graficos, él llame al archivo graficos que se encuentra dentro de routes
app.use('/graficos/', require('./routes/graficos'));
//listen en este caso usa un app.get para obtener lo que hay en la variable port y así conectarse al puerto
app.listen(app.get('port'), () => {
    console.log('Conectado en puerto', app.get('port'));
});