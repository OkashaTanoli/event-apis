const router = require("express").Router();
const { SignUpVolunteer, LoginVolunteer, GetVolunteer, DeleteVolunteer, UpdateVolunteer } = require('../controller/volunteer')
const { CheckUser } = require('../middleware/checkuser')

router.route('/signup').post(SignUpVolunteer)
router.route('/login').post(LoginVolunteer)
// router.route('/forgetpassword').patch(ForgetPassword)
router.route('/').get(CheckUser, GetVolunteer).delete(CheckUser, DeleteVolunteer).patch(CheckUser, UpdateVolunteer)


module.exports = router