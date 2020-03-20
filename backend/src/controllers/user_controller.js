const connection = require('../database/database');
const userController = {};
const rscController = require('../resources/rsc_controller')

userController.getUsers = async (req, res) => {
    try {
        let sql = "select * from f_get_users()";
        await connection.query(sql, (err, results) => {
            if (!err) {
                res.status(200).json(results.rows);

            } else {
                res.status(204).json({ err: err });
            }
        });
    } catch (error) {
        res.status(204).json({ err: error });
        // res.status(200).json(rscController.leerRecurso(1000));
    }
}

module.exports = userController;