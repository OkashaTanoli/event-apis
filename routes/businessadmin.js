const router = require("express").Router();
const { SignUpBusinessAdmin, LoginBusinessAdmin } = require('../controller/businessadmin')

router.route('/signup').post(SignUpBusinessAdmin)
router.route('/login').post(LoginBusinessAdmin)


module.exports = router