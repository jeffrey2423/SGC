const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user_controller');

router.route('/')
    //obtener datos
    .get(userController.getUsers)
    .post(userController.createUser)

module.exports = router;