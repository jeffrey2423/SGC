const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config()
const authToken = require("./middlewares/auth_token");
const config = require('./config/config')
const bodyParser = require('body-parser');
const app = express();

app.use(cors(config.application.cors.server));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(authToken);
app.use('/api/user', require('./routes/user'));
app.use('/api/user/auth', require('./routes/auth'));
app.use('/api/user/profile', require('./routes/profile'));
app.use('/api/user/events', require('./routes/events'));

//SETTINGS
app.set('port', config.API_PORT || 4000);

module.exports = app;