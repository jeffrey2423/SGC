const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user_controller');

router.route('/getUsers/:id')
    //obtener datos
    .get(userController.getUsers)

router.route('/getProfesiones')
    //obtener profesiones
    .get(userController.getProfesiones)

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

router.route('/deleteUser')
    //actualizar indicador activo usuario
    .post(userController.deleteUser)

router.route('/activateUser')
    //actualizar indicador activo usuario
    .post(userController.activateUser)

router.route('/updateUserPerfil')
    //actualizar perfil usuario
    .put(userController.updateUserPerfil)

module.exports = router;