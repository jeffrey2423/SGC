// const { Pool, Client } = require('pg');
var pg = require('pg'); 
const config = require('../config/config')

// const connection = new Client({
//     user: config.USER,
//     host: config.HOST,
//     database: config.DATABASE,
//     password: config.PASS,
//     port: config.PORTBD
// });


var conString = "postgres://"+config.USER+":"+config.PASS+"@localhost:5432/"+config.DATABASE+""; 

var client = new pg.Client(conString);
client.connect();
// connection.connect(function (err){
//     try {
//         if(err){
//             console.log(err);
//             return;
//         }else{
//             console.log('Database is connected');
//         }
//     } catch (error) {
//         console.log(err);
//     }

// });

module.exports = client;