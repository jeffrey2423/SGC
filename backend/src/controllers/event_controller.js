const connection = require('../database/database');
const eventController = {};
const rscController = require('../resources/rsc_controller');

eventController.getEvents = async (req, res) => {
    try {
        const id_evento = req.params.id;
        if (id_evento == 9999) {
            const query = {
                text: "select * from f_obtener_eventos_ext()"
            }
            await connection.query(query, (err, results) => {
                if (!err) {
                    res.status(200).json(results.rows);
                } else {
                    connection.query('ROLLBACK');
                    res.json(rscController.leerRecurso(1028, err.message));
                }
            });
        } else {
            const query = {
                text: "select * from f_obtener_evento($1)",
                values: [id_evento]
            }
            await connection.query(query, (err, results) => {
                if (!err) {
                    res.status(200).json(results.rows);
                } else {
                    connection.query('ROLLBACK');
                    res.json(rscController.leerRecurso(1028, err.message));
                }
            });
        }

    } catch (error) {
        await connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1028, error.message));
    }
}

module.exports = eventController;