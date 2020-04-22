const connection = require('../database/database');
const authController = {};
const rscController = require('../resources/rsc_controller');
const CONFIG = require("../config/config");
const jwt =  require("jsonwebtoken");

// function para la autenticacion

authController.auth = async (req, res) => {
    try {
        const user = req.body;
        console.log(user)

        let resultadoValidar;
        const queryValidarUsuario = {
            text: "select * from f_validar_autenticacion($1)",
            values: [user]
        };
        // Validamos que el usuario exista
        await connection.query(queryValidarUsuario, (err, results) => {
            if (!err) {
                const estadoUsuario = results.rows[0].f_validar_autenticacion;
                switch (estadoUsuario) {
                    case rscController.ESTADO_USUARIO.NO_EXISTE:
                        res.json(rscController.leerRecurso(1008));
                        resultadoValidar = false;
                        break;
                    case rscController.ESTADO_USUARIO.INACTIVO:
                        res.json(rscController.leerRecurso(1007));
                        resultadoValidar = false;
                        break;
                    case rscController.ESTADO_USUARIO.DATOS_INCORRECTOS:
                        res.json(rscController.leerRecurso(1006));
                        resultadoValidar = false;
                        break;
                    default:
                        resultadoValidar = true;
                }

            } else {
                connection.query('ROLLBACK');
                res.json(rscController.leerRecurso(1005, err.message));
                resultadoValidar = false;
            }
        });

        // dormimos el hilo principal para que no pase al siguiente bloque
        // sin que la variable resultadoValidar este llena
        await rscController.snooze(10);

        if (resultadoValidar) {

            const query = {
                text: "select * from f_autenticacion_usuario($1)",
                values: [user]
            };
            await connection.query(query, (err, results) => {
                if (!err) {
                    const payload = results.rows[0];
                    jwt.sign(payload,CONFIG.SECRET_KEY, (jwtErr,token) => {
                        if(!jwtErr){
                            res.status(200).json({token:token});
                        }else{
                            res.json(rscController.leerRecurso(1005, jwtErr.message));
                        }
                    });
                    
                } else {
                    connection.query('ROLLBACK');
                    res.json(rscController.leerRecurso(1005, err.message));
                }
            });
        }
    } catch (error) {
        connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1005, error.message));
    }

}

module.exports = authController;