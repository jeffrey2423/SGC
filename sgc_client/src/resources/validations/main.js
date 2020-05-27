import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import alertify from 'alertifyjs'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'

import clientGenerales from '../client.js'

alertify.set('notifier', 'position', 'top-right');


const validationController = {};

validationController.confirmacion = async () => {

    return Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras reversar esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    })

};

validationController.success = (estado, descripcion, id) => {
    Swal.fire({
        icon: 'success',
        title: estado,
        text: descripcion,
        footer: id
    })
};

validationController.error = (estado, descripcion, id, traza = "") => {
    Swal.fire({
        icon: 'error',
        title: estado,
        text: descripcion,
        footer: "<center>" + id + "<br/>" + traza + "</center>"
    })
};

validationController.validarCampo = (texto, campo) => {
    let sePuede = true;
    if (texto === "") {
        // Swal.fire({
        //     icon: 'error',
        //     title: "error",
        //     text: "El campo " + campo + " no puede estar vacio",
        // })
        alertify.error("El campo " + campo + " no puede estar vacio");
        sePuede = false;
    }

    return sePuede;
};


validationController.validarUsuario = (usuario) => {
    let results = [], result = true;
    results.push(!validationController.validateEmptyField(usuario.nombre));
    results.push(!validationController.validateEmptyField(usuario.apellido));
    results.push(!validationController.validateEmptyField(usuario.clave));
    // results.push(usuario.clave==usuario.clave2);
    results.push(validationController.validateSelect(usuario.id_profesion));
    results.push(validationController.validateSelect(usuario.id_perfil));
    results.push(validationController.validateEmail(usuario.email));

    for (var element in results) {
        result = result && results[element];
    };

    if (!result) {
        // Swal.fire({
        //     icon: 'error',
        //     title: "Error de validación",
        //     text: "Campos incorrectos, revise el formulario de registro",

        // })
        // alertify.set('notifier', 'position', 'top-right');
        alertify.error('Campos incorrectos, revise el formulario de registro');
    } else {
        if (usuario.clave != usuario.clave2) {
            // alertify.set('notifier', 'position', 'top-right');
            alertify.error('Las claves no coinciden');
            result = false;
        }
    }

    return result;
};

validationController.validarCita = (cita) => {
    const fechaIni = new Date(cita.fecha_inicial),
        fechaFin = new Date(cita.fecha_final);

    let results = [], result = true;
    results.push(!validationController.validateEmptyField(cita.titulo));
    results.push(!validationController.validateEmptyField(cita.descripcion));
    results.push(validationController.validateSelect(cita.id_asignado));

    for (var element in results) {
        result = result && results[element];
    };

    if (!result) {
        alertify.error('Campos incorrectos, revise el formulario de registro');
    } else {
        fechaIni.setSeconds(0, 0);
        fechaFin.setSeconds(0, 0);

        if (fechaIni > fechaFin) {
            alertify.error('La fecha inicial no puede ser mayor que la final');
            result = false;
        } else if (fechaFin < fechaIni) {
            alertify.error('La fecha final no puede ser menor que la inicial');
            result = false;
        } else if (fechaIni.getTime() == fechaFin.getTime()) {
            alertify.error('La fecha inicial y final no pueden ser iguales');
            result = false;
        }
    }

    return result;
};

validationController.validarUsuarioUpdate = (usuario, datos) => {
    let result = true
    switch (datos) {
        case clientGenerales.DATOS_USUARIO.GENERALES:
            let results = [];
            results.push(!validationController.validateEmptyField(usuario.nombre));
            results.push(!validationController.validateEmptyField(usuario.apellido));
            results.push(validationController.validateSelect(usuario.id_profesion));

            for (var element in results) {
                result = result && results[element];
            };

            if (!result) {
                alertify.error('Campos incorrectos, revise el formulario de registro');
            }

            break;
        case clientGenerales.DATOS_USUARIO.SEGURIDAD:
            if (usuario.clave != usuario.clave2) {
                alertify.error('Las claves no coinciden');
                result = false;
            }
            break;
        case clientGenerales.DATOS_USUARIO.ACCESO_EMAIL:
            if (validationController.validateEmail(usuario.email)) {
                alertify.error('El email no es valido');
                result = false;
            }
            break;
        case clientGenerales.DATOS_USUARIO.ACCESO_PERFIL:
            if (validationController.validateSelect(usuario.id_perfil)) {
                alertify.error('El email no es valido');
                result = false;
            }
            break;
    }


    return result;
};

validationController.validateEmptyField = (field) => {
    var re = /^\s+$/;
    return re.test(field) || field === null || field === "";
};

validationController.validateSelect = (field) => {
    var re = /^[1-9]+[0-9]*$/;
    return re.test(field);
};

validationController.validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

validationController.insertUserSuccess = () => {
    Swal.fire({
        icon: 'success',
        title: "Registro exitoso",
        text: "Usuario registrado con éxito"
    })
}

validationController.errorGenereal = (desc) => {
    // Swal.fire({
    //     icon: 'error',
    //     title: "error",
    //     text: desc,

    // })
    // alertify.set('notifier', 'position', 'top-right');
    alertify.error(desc);
}

validationController.descripcion = (texto) => {
    Swal.fire(texto === null ? "" : texto)
}



export default validationController;