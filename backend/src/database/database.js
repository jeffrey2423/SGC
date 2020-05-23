const { Pool, Client } = require('pg');
// var pg = require('pg');
const config = require('../config/config')

const connection = new Pool({
    user: config.USER,
    host: config.HOST,
    database: config.DATABASE,
    password: config.PASS,
    port: config.PORTBD
});


// var conString = "postgres://" + config.USER + ":" + config.PASS + "@localhost:5432/" + config.DATABASE + "";

// var client = new pg.Pool(conString);

// client.connect((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     } else {
//         console.log('Database is connected');
//     }
// });
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Database is connected');
    }
});

module.exports = connection;