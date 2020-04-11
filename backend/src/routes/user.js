const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user_controller');

router.route('/getUsers')
    //obtener datos
    .get(userController.getUsers)
router.route('/createUser')
    //crear usuario
    .post(userController.createUser)

module.exports = router;