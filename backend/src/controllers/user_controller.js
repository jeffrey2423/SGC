const connection = require('../database/database');
const userController = {};
const rscController = require('../resources/rsc_controller')

const PERMISOS = require('../resources/permisos')

// Declaramos enumeradores para no crear confusion al leer el codigo
const ESTADO_USUARIO = {
    INACTIVO: 0,
    ACTIVO: 1,
    NO_EXISTE:0,
    EXISTE: 1
}

// Funcion para obtener usuarios
userController.getUsers = async (req, res) => {
    try {
        const query = {
            text: "select * from f_obtener_usuarios()"
        }
        await connection.query(query, (err, results) => {
            if (!err) {
                res.status(200).json(results.rows);
            } else {
                res.json(rscController.leerRecurso(1000, err.message));
            }
        });
    } catch (error) {
        await connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1000, error.message));
    }
}

// funcion para guardar usuarios
userController.createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const query = {
            text: "select f_insertar_usuario($1)",
            values: [newUser]
        };
        await connection.query(query, (err, results) => {
            if (!err) {
                res.json(rscController.leerRecurso(1002));

            } else {
                res.json(rscController.leerRecurso(1003, err.message));
            }
        });
    } catch (error) {
        await connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1003, error.message));
    }
}


module.exports = userController;