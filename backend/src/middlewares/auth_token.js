const connection = require('../database/database');
const rscController = require('../resources/rsc_controller');
const permisos = require('../resources/constantes/permisos');
const config = require("../config/config");
const rutas = require("../resources/constantes/rutas");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const ruta = req.path;
        let permitir;
        let perfilUsuario;
        let datosUsuario;
        const query = "select f_verificar_permiso_usuario($1, $2)";
        let queryParams;

        if (ruta != rutas.LOGIN) {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        res.json(rscController.leerRecurso(1005, err.message));
                        res.end();
                    } else {
                        datosUsuario = decoded;
                        perfilUsuario = decoded.f1004_id_perfil_t1000;
                    }
                });

                switch (ruta) {
                    case rutas.VER_USUARIOS:
                        queryParams = [perfilUsuario, permisos.OBTENER_USUARIOS];
                        await connection.query(query, queryParams, (err, results) => {
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(10);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }

                        break;

                    case rutas.CREAR_USUARIO:
                        queryParams = [perfilUsuario, permisos.CREAR_USUARIO];

                        await connection.query(query, queryParams, (err, results) => {
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(10);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;
                    default:
                        next();
                }

            } else {
                res.json(rscController.leerRecurso(1010));
            }

        } else {
            next();
        }

    } catch (error) {
        res.json(rscController.leerRecurso(1005, error.message));
    }
}

