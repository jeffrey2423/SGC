const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const app = express();
const authToken = require("./middlewares/auth_token");
const config = require('./config/config')

//SETTINGS
app.set('port', config.API_PORT ||  4000);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());


app.use(authToken);
app.use('/api/user', require('./routes/user'));
app.use('/api/user/auth', require('./routes/auth'));
app.use('/api/user/profile', require('./routes/profile'));
app.use('/api/user/events', require('./routes/events'));

module.exports = app;