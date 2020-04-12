const connection = require('../database/database');
const profileController = {};
const rscController = require('../resources/rsc_controller');

profileController.getProfiles = async (req, res) => {
    try {
        const query = {
            text: "select * from f_obtener_perfiles()"
        }
        await connection.query(query, (err, results) => {
            if (!err) {
                res.status(200).json(results.rows);
            } else {
                connection.query('ROLLBACK');
                res.json(rscController.leerRecurso(1011, err.message));
            }
        });
    } catch (error) {
        await connection.query('ROLLBACK');
        res.json(rscController.leerRecurso(1011, error.message));
    }
}

module.exports = profileController;
