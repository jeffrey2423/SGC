const { Pool, Client } = require('pg');

const connection = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: process.env.PORTBD
});

connection.connect(function (err){
    try {
        if(err){
            console.log(err);
            return;
        }else{
            console.log('db is connected');
        }
    } catch (error) {
        console.log(err);
    }

});

module.exports = connection;