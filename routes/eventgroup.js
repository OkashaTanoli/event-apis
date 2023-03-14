const router = require("express").Router();
const { CreateEventGroup, GetEventGroups, GetSingleEventGroup, UpdateEventGroup, DeleteEventGroup } = require('../controller/eventgroup')

router.route('/').post(CreateEventGroup).get(GetEventGroups)
router.route('/:id').get(GetSingleEventGroup).patch(UpdateEventGroup).delete(DeleteEventGroup)


module.exports = router