require('dotenv').config();
//serverless-http se usa para poder usar la librería serverless que nos ayuda a subir más fácil nuestra app a AWS
const serverless = require('serverless-http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const PUERTO = 4300;
const app = express();

app.set('port', process.env.PORT || PUERTO);
app.get('/', inicio);
app.get('/grafico/:ticker', (req, res) => {
    res.sendFile(__dirname + "/public/grafico.html");
});
app.use(express.static(path.join(__dirname, 'public')));
app.use("/static", express.static("public"));

function inicio (peticion, resultado) {
    resultado.sendFile(__dirname + "/public/index.html");
}

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(require('./routes'));
app.use('/graficos/', require('./routes/graficos'));
//se comentó el listen para que no nos muestre mensaje a nuestro servidor amazon
/*app.listen(app.get('port'), () => {
    console.log('Conectado en puerto', app.get('port'));
});*/

//module.exports.handler se usa para manejar el módulo. Esto se usa porque AWS necesita en sus funciones serverless, como lambda, que 
//el módulo se exporte como un manejador. En este caso estamos usando una librería llamada serverless, que permite hacer la 
//subida más rápida a nuestro lambda. Entre paréntesis se coloca la constante app para que la exporte.
module.exports.handler = serverless(app);