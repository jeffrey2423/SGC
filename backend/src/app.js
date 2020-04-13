const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const app = express();
const authToken = require("./middlewares/auth_token");

//SETTINGS
app.set('port', process.env.API_PORT ||  4000);


//MIDDLEWARES
//se le dice al servidor que debe entender json
//enviar en este caso o entender
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());



//ROUTES
//especificamos las urls que la aplicacion de react
//podra acceder
app.use(authToken);
app.use('/api/user', require('./routes/user'));
app.use('/api/user/auth', require('./routes/auth'));
app.use('/api/user/profile', require('./routes/profile'));
app.use('/api/user/events', require('./routes/events'));

module.exports = app;