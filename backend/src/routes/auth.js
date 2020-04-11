const { Router } = require('express');
const router = Router();

const authController = require('../controllers/auth_controller');


router.route('/')
    .post(authController.auth)

module.exports = router;