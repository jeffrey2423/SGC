const connection = require('../database/database');
const userController = {};
const rscController = require('../resources/rsc_controller')

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
                connection.query('ROLLBACK');
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

        let resultadoValidar;
        const queryValidarUsuario = {
            text: "select * from f_validar_usuario_db($1)",
            values: [req.body.email]
        };
        // Validamos que el email no exista
        await connection.query(queryValidarUsuario, (err, results) => {
            if (!err) {
                const estadoUsuario = results.rows[0].f_validar_usuario_db;
                resultadoValidar = (estadoUsuario == rscController.ESTADO_USUARIO.NO_EXISTE) ? true : false;
                
            } else {
                resultadoValidar = false;
                console.log(err);
            }
        });

        // dormimos el hilo principal para que no pase al siguiente bloque
        // sin que la variable resultadoValidar este llena
        await rscController.snooze(10);      

        if (resultadoValidar) {
            const newUser = req.body;
            const query = {
                text: "select * from f_insertar_usuario($1)",
                values: [newUser]
            };
            await connection.query(query, (err, results) => {
                if (!err) {
                    res.json(rscController.leerRecurso(1002));

                } else {
                    connection.query('ROLLBACK');
                    res.json(rscController.leerRecurso(1003, err.message));
                }
            });
        } else {
            res.json(rscController.leerRecurso(1004));
        }

    } catch (error) {
        await connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1003, error.message));
    }
}


module.exports = userController;