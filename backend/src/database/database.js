const { Pool, Client } = require('pg');

const connection = new Client({
    user: "postgres",
    host: "localhost",
    database: "sgc",
    password: "Salem314821",
    port: "5432"
});

connection.connect(function (err){
    try {
        if(err){
            console.log(err);
            return;
        }else{
            console.log('Database is connected');
        }
    } catch (error) {
        console.log(err);
    }

});

module.exports = connection;