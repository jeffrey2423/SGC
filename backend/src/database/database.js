const { Pool, Client } = require('pg');
const config = require('../config/config')

const connection = new Client({
    user: config.USER,
    host: config.HOST,
    database: config.DATABASE,
    password: config.PASS,
    port: config.PORTBD
});

connection.connect(function (err){
    try {
        if(err){
            console.log("Fallo conexion");
            console.log(err);
            return;
        }else{
            console.log('Database is connected');
        }
    } catch (error) {
        console.log(err);
        console.log("Fallo conexion");
    }

});

module.exports = connection;