import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const validationController = {};

validationController.confirmacion = async () => {

    return Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras reversar esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar!'
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

validationController.error = (estado, descripcion, id, traza) => {
    Swal.fire({
        icon: 'error',
        title: estado,
        text: descripcion,
        footer: id + " " + traza === null || traza === "" ? "" : traza
    })
};

validationController.validarCampo = (texto, campo) => {
    let sePuede = true;
    if (texto === "") {
        Swal.fire({
            icon: 'error',
            title: "error",
            text: "El campo " + campo + " no puede estar vacio",

        })
        sePuede = false;
    }

    return sePuede;
};


validationController.validarUsuario = (usuario) =>{
    let results = [], result = true;
    results.push(!validationController.validateEmptyField(usuario.nombre));
    results.push(!validationController.validateEmptyField(usuario.apellido));
    results.push(!validationController.validateEmptyField(usuario.clave));
    results.push(usuario.clave==usuario.clave2);
    results.push(validationController.validateSelect(usuario.id_profesion));
    results.push(validationController.validateSelect(usuario.id_perfil));
    results.push(validationController.validateEmail(usuario.email));

    for(var element in results) {
        result = result && results[element];
    };

    if(!result){
        Swal.fire({
            icon: 'error',
            title: "Error de validación",
            text: "Campos incorrectos, revise el formulario de registro",

        })
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

validationController.insertUserSuccess = () =>{
    Swal.fire({
        icon: 'success',
        title: "Registro exitoso",
        text: "Usuario registrado con éxito"
    })
}

validationController.errorGenereal = (desc) => {
    Swal.fire({
        icon: 'error',
        title: "error",
        text: desc,

    })

}

validationController.descripcion = (texto) => {
    Swal.fire(texto === null ? "" : texto)
}



export default validationController;