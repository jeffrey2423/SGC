const connection = require('../database/database');
const rscController = require('../resources/rsc_controller');
const permisos = require('../resources/constantes/permisos');
const config = require("../config/config");
const rutas = require("../resources/constantes/rutas");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        let ruta = ""
        let permitir;
        let perfilUsuario;
        let datosUsuario;
        const query = "select f_verificar_permiso_usuario($1, $2)";
        let queryParams;
        ruta = req.path;
        if (ruta != rutas.LOGIN) {
            if (req.headers.authorization) {
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        res.json(rscController.leerRecurso(1005, err.message));
                        res.sendStatus(500);
                        return;
                    } else {
                        datosUsuario = decoded;
                        perfilUsuario = decoded.f1004_id_perfil_t1000;
                    }
                });
                
                switch (ruta) {
                    // case rutas.OBTENER_USUARIOS:
                    //     // console.log(perfilUsuario)
                    //     queryParams = [perfilUsuario, permisos.OBTENER_USUARIOS];
                    //     await connection.query(query, queryParams, (err, results) => {
                    //         rscController.snooze(15);
                    //         if (!err) {
                    //             const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                    //             permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                    //         } else {
                    //             permitir = false;
                    //             res.json(rscController.leerRecurso(1005, err.message));
                    //         }
                    //     });

                    //     await rscController.snooze(20);

                    //     if (permitir) {
                    //         next();
                    //     } else {
                    //         res.json(rscController.leerRecurso(1041));
                    //     }

                    //     break;

                    // case rutas.OBTENER_CITAS:
                    //     queryParams = [perfilUsuario, permisos.OBTENER_CITAS];

                    //     await connection.query(query, queryParams, (err, results) => {
                    //         rscController.snooze(15);
                    //         if (!err) {
                    //             const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                    //             permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                    //         } else {
                    //             permitir = false;
                    //             res.json(rscController.leerRecurso(1005, err.message));
                    //         }
                    //     });
                    //     await rscController.snooze(20);

                    //     if (permitir) {
                    //         next();
                    //     } else {
                    //         res.json(rscController.leerRecurso(1009));
                    //     }
                    //     break;
                    case rutas.CREAR_CITAS:
                        queryParams = [perfilUsuario, permisos.CREAR_CITAS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;

                    case rutas.CREAR_USUARIO:
                        queryParams = [perfilUsuario, permisos.CREAR_USUARIOS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;
                    
                    case rutas.CANCELAR_CITAS:
                        queryParams = [perfilUsuario, permisos.CANCELAR_CITAS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;

                    case rutas.INACTIVAR_USUARIOS:
                        queryParams = [perfilUsuario, permisos.INACTIVAR_USUARIOS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;

                    case rutas.CREAR_PERFIL:
                    case rutas.ASIGNAR_PERMISOS:
                        queryParams = [perfilUsuario, permisos.CREAR_PERFIL];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;

                    case rutas.ACTIVAR_CITAS:
                        queryParams = [perfilUsuario, permisos.ACTIVAR_CITAS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;

                    case rutas.ACTIVAR_USUARIOS:
                        queryParams = [perfilUsuario, permisos.ACTIVAR_USUARIOS];

                        await connection.query(query, queryParams, (err, results) => {
                            rscController.snooze(15);
                            if (!err) {
                                const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                            } else {
                                permitir = false;
                                res.json(rscController.leerRecurso(1005, err.message));
                            }
                        });
                        await rscController.snooze(20);

                        if (permitir) {
                            next();
                        } else {
                            res.json(rscController.leerRecurso(1009));
                        }
                        break;
                    default:
                        if (ruta.includes(rutas.EDITAR_CITAS)) {
                            queryParams = [perfilUsuario, permisos.EDITAR_CITAS];

                            await connection.query(query, queryParams, (err, results) => {
                                rscController.snooze(15);
                                if (!err) {
                                    const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                    permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                                } else {
                                    permitir = false;
                                    res.json(rscController.leerRecurso(1005, err.message));
                                }
                            });
                            await rscController.snooze(20);

                            if (permitir) {
                                next();
                            } else {
                                res.json(rscController.leerRecurso(1009));
                            }
                        } else if (ruta.includes(rutas.EDITAR_USUARIOS)) {
                            queryParams = [perfilUsuario, permisos.EDITAR_USUARIOS];

                            await connection.query(query, queryParams, (err, results) => {
                                rscController.snooze(15);
                                if (!err) {
                                    const permisoUsuario = results.rows[0].f_verificar_permiso_usuario;
                                    permitir = (permisoUsuario == rscController.ESTADO_USUARIO.EXISTE_PERMISO) ? true : false;

                                } else {
                                    permitir = false;
                                    res.json(rscController.leerRecurso(1005, err.message));
                                }
                            });
                            await rscController.snooze(20);

                            if (permitir) {
                                next();
                            } else {
                                res.json(rscController.leerRecurso(1009));
                            }

                        } else {
                            next();
                        }


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

