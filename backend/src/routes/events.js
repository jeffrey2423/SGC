const { Router } = require('express');
const router = Router();

const eventController = require('../controllers/event_controller');

router.route('/getEvents/:id')
    //obtener datos
    .get(eventController.getEvents)

module.exports = router;