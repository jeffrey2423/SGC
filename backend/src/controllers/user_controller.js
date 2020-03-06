const userController = {};
const rscController = require('../resources/rsc_controller')

userController.getUsers = async (req, res) => {
    try {
        res.status(201).send(rscController.leerRecurso(1000))
    } catch (error) {
        res.status(204).send(rscController.leerRecurso(1000))
    }
}

module.exports = userController;