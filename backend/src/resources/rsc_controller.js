const rsc = require('./rsc_server');

const rsc_controller = {};

//funcion para leer el json de recursos del servidor
rsc_controller.leerRecurso = (key) => {

    try {
        if (rsc.hasOwnProperty(key)) {
            const strJson = JSON.stringify(rsc);
            const objValue = JSON.parse(strJson);
            return objValue[key];
        } else {
            return "no esta";
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = rsc_controller;