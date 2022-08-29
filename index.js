const express = require('express');
const path = require('path');
const cors = require('cors');  // cambio para solucionar el problema 3000
require('dotenv').config();

// DB config
require('./database/config').dbConnection();

// App de Express
const app = express();
app.use(cors()); // cambio para solucionar el problema 3000

// Lectura y parseo del body
app.use(express.json());
 
// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/form', require('./routes/form'));
app.use('/api/dash', require('./routes/dash'));

server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT );
});
