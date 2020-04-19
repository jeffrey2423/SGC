const { Router } = require('express');
const router = Router();

const eventController = require('../controllers/event_controller');

router.route('/getEvents/:id')
    //obtener datos
    .get(eventController.getEvents)

router.route('/getEventsFilter')
    //obtener datos con filtro
    .get(eventController.getEventsFilter)

router.route('/createEvent')
    //obtener datos con filtro
    .post(eventController.createEvent)

router.route('/deleteEvent/:id')
    //obtener datos con filtro
    .put(eventController.deleteEvent)

router.route('/updateEvent/:id')
    //obtener datos con filtro
    .put(eventController.updateEvent)

module.exports = router;