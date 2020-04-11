const connection = require('../database/database');
const rsc = require('./constantes/rsc_server');

const rsc_controller = {};

// Declaramos enumeradores para no crear confusion al leer el codigo
rsc_controller.ESTADO_USUARIO = {
    INACTIVO: 2,
    ACTIVO: 1,
    NO_EXISTE: 0,
    EXISTE: 1,

}

// Funcion para obtener el json del recurso para enviar al Cliente 
// el parametro traza sera opcional para cuando se llame un recurso
// de error, para mostrar un mensaje adecuado al cliente pero 
// igual tener una traza del error
rsc_controller.leerRecurso = (keymsg, traza = "") => {
    try {
        let data = {
            id: 0000,
            description: "",
            status: ""
        };
        Object.keys(rsc).forEach(function (key) {
            var value = rsc[key];
            if (value.id == keymsg) {
                if (traza != "") {
                    value.traza = traza;
                    data = value;
                } else {
                    data = value;
                }
            } else {
                return "";
            }

        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

rsc_controller.obtenerEstadoUsuario = async (email) => {
    try {
        const query = {
            text: "select f_validar_usuario_db($1)",
            values: [email]
        };
        await connection.query(query, (err, results) => {
            if (!err) {               
                const estadoUsuario = results.rows[0].f_validar_usuario_db;
                return (estadoUsuario == ESTADO_USUARIO.NO_EXISTE) ? true : false;               
            } else {
                return  false;
            }
        });
        
    } catch (error) {
        console.log(error);
        return false;
    }
};

rsc_controller.snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = rsc_controller;