
const express = require('express');
require('dotenv').config();
const dbConnection = require('./database/config');
const cors = require('cors');

//Crear el servidor de express

const app = express();

//base de datos

dbConnection();

//cors
app.use(cors());

// Directorio publico

app.use(express.static('public'));


// Lectura y parseo del body

app.use( express.json() );

//Rutas
//app.use('/api/login', require('./routs/usuario'));
app.use('/api/socio', require('./routs/socioRout'));
app.use('/api/factura', require('./routs/facturaRout'));
app.use('/api/usuario', require('./routs/usuarioRout'));
app.use('/api/egreso', require('./routs/egresoRout'));
app.use('/api/caja', require('./routs/cajaRout'));
app.use('/api/ingresoferney', require('./routs/ingresoFerneyRout'));
app.use('/api/egresoferney', require('./routs/egresoFerneyRout'));
app.use('/api/cajaferney', require('./routs/cajaFerneyRout'));


// Escuchar peticiones

const port = process.env.PORT || 5000;

app.listen(port , () => {
    console.log(`Servidor corriendo en puerto ${port}` );
} )
