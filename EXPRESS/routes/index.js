//express está para indicar que se usará express
const express = require('express');
//router permite que el express pueda navegar entre diferentes rutas
const router = express.Router();

//En este caso me permite que cuando me conecte al index pueda mostrar un mensaje diciendo OK
router.get('/', (req, res) => {
    console.log('OK')
})

//El router siempre debe exportarse para poder ser usando dentro de toda la aplicación
module.exports = router;