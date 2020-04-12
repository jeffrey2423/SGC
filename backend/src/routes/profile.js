const { Router } = require('express');
const router = Router();

const profileController = require('../controllers/profile_controller');

router.route('/getProfiles')
    //obtener datos
    .get(profileController.getProfiles)
router.route('/createProfile')
    //crear usuario
    // .post(profileController.createProfile)

module.exports = router;