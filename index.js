import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({ path: "variables.env" });

const app = express(); // ejecuta express

// Conectar la bases de datos
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error));


//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

// Obtener el ano actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta publica
app.use(express.static('public'));

// Agregar Router
app.use('/', router);

//arranca el servidor con el metodo listen y le pasas el puerto en que lo quieres ejecutar
app.listen(port, host, () => {
    console.log(`El Servidor esta funcionando`);
});