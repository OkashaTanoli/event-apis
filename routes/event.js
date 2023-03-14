const router = require("express").Router();
const { CreateEvent, GetEvents, GetSingleEvent, UpdateEvent, DeleteEvent } = require('../controller/event')

router.route('/').post(CreateEvent).get(GetEvents)
router.route('/:id').get(GetSingleEvent).patch(UpdateEvent).delete(DeleteEvent)


module.exports = router