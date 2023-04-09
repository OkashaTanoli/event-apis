const router = require("express").Router();
const { CreateTiming, GetTimings, GetSingleTiming, UpdateTiming, DeleteTiming } = require('../controller/timing')
// const { CheckUser } = require('../middleware/checkuser')

router.route('/').post(CreateTiming).get(GetTimings)
router.route('/:id').get(GetSingleTiming).patch(UpdateTiming).delete(DeleteTiming)


module.exports = router