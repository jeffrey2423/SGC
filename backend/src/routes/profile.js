const { Router } = require('express');
const router = Router();

const profileController = require('../controllers/profile_controller');

router.route('/getProfiles')
    //obtener datos
    .get(profileController.getProfiles)
router.route('/getPermission/:id')
    //obtener permisos
    .get(profileController.getPermissions)
router.route('/createProfile')
    //crear perfil
    .post(profileController.createProfile)
router.route('/createProfileExt')
    //crear perfil
    .post(profileController.createProfileExt)

module.exports = router;