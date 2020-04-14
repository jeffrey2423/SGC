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

validationController.error = (estado, descripcion, id) => {
    Swal.fire({
        icon: 'error',
        title: estado,
        text: descripcion,
        footer: id
    })
};

export default validationController;