const connection = require('../database/database');
const userController = {};
const rscController = require('../resources/rsc_controller')

// Declaramos enumeradores para no crear confusion al leer el codigo
const estadoUsuario = {
    INACTIVO: 0,
    ACTIVO: 1,
    DATOS_NO_VALIDOS:9999
}

// Funcion para obtener usuarios
userController.getUsers = async (req, res) => {
    try {
        const query = {
            text: "select * from f_get_users()"
        }
        await connection.query(query, (err, results) => {
            if (!err) {
                res.status(200).json(results.rows);
            } else {
                res.json({ err: err.message });
            }
        });
    } catch (error) {
        await connection.query('ROLLBACK');
        res.json({ err: error.message });
        // res.status(200).json(rscController.leerRecurso(1000));
    }
}

// funcion para guardar usuarios
userController.createUser = async (req, res) => {
    try {
        // CUANDO SE CONSUMA DESDE REACT
        // NO HAY NECESIDAD DE OBTENER
        // VARIABLE POR VARIABLE, SOLO SE LLAMA POR EL NOMBRE DEL JSON QUE SE LE DIO EN REACT Y LISTO
        const { nombre, clave, rol } = req.body;
        const newUser = {
            nombre,
            clave,
            rol
        };
        const query = {
            text: "select f_insertar_usuario($1)",
            values: [newUser]
        }
        await connection.query(query, (err, results) => {
            if (!err) {
                res.status(200).json(rscController.leerRecurso(1002));

            } else {
                res.json({ err: err.message });
            }
        });
    } catch (error) {
        await connection.query('ROLLBACK');
        res.status(204).json({ err: error.message });
        // res.status(200).json(rscController.leerRecurso(1000));
    }
}


module.exports = userController;