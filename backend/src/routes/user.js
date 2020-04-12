const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user_controller');

router.route('/getUsers/:id')
    //obtener datos
    .get(userController.getUsers)

router.route('/createUser')
    //crear usuario
    .post(userController.createUser)

router.route('/updateUser/:id')
    //actualizar usuario
    .put(userController.updateUser)

router.route('/updateUserPass/:id')
    //actualizar contraseña usuario
    .put(userController.updateUserPass)

router.route('/updateUserEmail/:id')
    //actualizar email usuario
    .put(userController.updateUserEmail)

router.route('/deleteUser/:id')
    //actualizar indicador activo usuario
    .put(userController.deleteUser)

router.route('/activateUser/:id')
    //actualizar indicador activo usuario
    .put(userController.activateUser)

module.exports = router;